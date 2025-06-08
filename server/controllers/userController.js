import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all the fields" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userId;

    if (!userId || !planId)
      return res.json({ success: false, message: "Invalid details" });

    const plans = {
      Basic: { credits: 100, amount: 10 },
      Advanced: { credits: 500, amount: 50 },
      Business: { credits: 2500, amount: 250 },
    };
    const plan = plans[planId];
    if (!plan) return res.json({ success: false, message: "Plan not found" });

    const transaction = await transactionModel.create({
      userId,
      plan: planId,
      amount: plan.amount,
      credits: plan.credits,
      date: Date.now(),
    });

    const order = await razorpayInstance.orders.create({
      amount: plan.amount * 100,
      currency: process.env.CURRENCY,
      receipt: transaction._id,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid")
      return res.json({ success: false, message: "Payment Failed" });

    const transaction = await transactionModel.findById(orderInfo.receipt);
    if (transaction.payment)
      return res.json({ success: false, message: "Payment already processed" });

    const user = await userModel.findById(transaction.userId);
    user.creditBalance += transaction.credits;
    await user.save();

    transaction.payment = true;
    await transaction.save();

    res.json({ success: true, message: "Credits added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User with this email does not exist." });

    const rawToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;
const message = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #4A90E2;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password for your Imagify account.</p>
    <p>Click the button below to reset your password. This link is valid for <strong>1 hour</strong>.</p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${resetURL}" style="background-color: #4A90E2; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </p>
    <p>If you did not request this, please ignore this email. Your password will remain secure.</p>
    <p>Thank you,<br/>The Imagify Team</p>
  </div>
`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    res.json({ success: true, message: "Password reset link sent." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.json({ success: false, message: error.message || "Something went wrong." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while resetting password" });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
  forgotPassword,
  resetPassword,
};


// import userModel from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import express from "express";
// import jwt from "jsonwebtoken";
// import razorpay from 'razorpay';
// import transactionModel from "../models/transactionModel.js";

// const registerUser = async (req, res) => {
//     try{
//         const { name, email, password } = req.body;

//         if(!name || !email || !password){
//             return res.json({success: false, message: "Please fill all the fields"});
//         } 

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);  

//         const userData = {
//             name,
//             email,
//             password: hashedPassword 
//         }

//         const newUser = new userModel(userData); 
//         const user = await newUser.save();

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )
//         res.json({
//             success: true,
//             token,
//             user: {
//                 name: user.name
//             }
//         })
//     }catch(error){
//         console.error(error);
//         res.json({success: false, message: error.message});

//     }
// }


// const loginUser = async (req, res) => {
//     try{
//         const { email, password } = req.body;
//         const user = await userModel.findOne({email});  
//         if(!user){
//             return res.json({success: false, message: "User does not exist"});
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(isPasswordValid){
//             const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
//             res.json({
//             success: true,
//             token,
//             user: {
//                 name: user.name
//             }
//         });
//         }
//         else{
//             return res.json({success: false, message: "Invalid credentials"});
//         }

//     }catch(error){
//         console.error(error);
//         res.json({success: false, message: error.message});
//     }
// } 

// const userCredits = async (req, res) => {
//     try{
//         const userId = req.userId;

//         const user = await userModel.findById(userId);
//         res.json({
//             success: true,
//             credits: user.creditBalance,
//             user   : {
//                 name: user.name,
//             }
//         })
//     }catch(error){
//         console.error(error);
//         res.json({success: false, message: error.message});

//     }
// }

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// const paymentRazorpay = async (req,res) => {
//     try{
//         const userId = req.userId;
//         const { planId } = req.body;
//         const userData = await userModel.findById(userId);

//         if(!userId || !planId){
//             return res.json({success: false, message: "Invalid details" })
//         }

//         let credits, plan, amount, date
//         switch (planId) {
//             case 'Basic':
//                 plan = 'Basic'
//                 credits = 100
//                 amount = 10
//                 break;

//             case 'Advanced':
//                 plan = 'Advanced'
//                 credits = 500
//                 amount = 50
//                 break;

//             case 'Business':
//                 plan = 'Business'
//                 credits = 2500
//                 amount = 250
//                 break;

//             default:
//                 return res.json({success: false, message: 'Plan not found'});
//         }
//         date = Date.now()

//         const transactionData = {
//             userId,
//             plan,
//             amount,
//             credits,
//             date
//         }

//         const newTransaction = await transactionModel.create(transactionData)

//         const options = {
//             amount: amount*100,
//             currency: process.env.CURRENCY,
//             receipt: newTransaction._id,
//         }
//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if(error){
//                 console.log(error);
//                 return res.json({success: false, message: error})
//             }
//             res.json({success: true, order })
//         })
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message })
//     }
// }

// const verifyRazorpay = async (req, res) => {
//     try{
//         const {razorpay_order_id} = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if(orderInfo.status === 'paid'){
//             const transactionData = await transactionModel.findById(orderInfo.receipt)
//             if(transactionData.payment){
//                 return res.json({success:false, message: 'Payment Failed'})
//             }

//             const userData = await userModel.findById(transactionData.userId)

//             const creditBalance = userData.creditBalance + transactionData.credits
//             await userModel.findByIdAndUpdate(userData._id, {creditBalance})
//             await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})

//             res.json({success:true, message: 'Credits added'})
//         }else{
//             res.json({success:false, message: 'Payment Failed'})
//         }
        
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message })
//     }
// }

// export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };