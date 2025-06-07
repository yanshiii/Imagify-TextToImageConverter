import formData from 'form-data';
import userModel from '../models/userModel.js';
import axios from 'axios';
const generateImage = async(req, res) => {
    try{

        const { prompt } = req.body;
        const userId = req.userId;  
        const user =  await userModel.findById(userId);
        if(!user || !prompt){
            return res.json({success: false, message: "Invalid user or prompt"});
        }
        if(user.creditBalance <= 0){
            return res.json({success: false, message: "Insufficient credits",
            creditBalance: user.creditBalance});
        }

        const formData = new FormData();
        formData.append('prompt', prompt);  

        const {data} =  await axios.post('https://clipdrop-api.co/text-to-image/v1 ', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            }, 
            responseType: 'arraybuffer',

        })
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`; 
        await userModel.findByIdAndUpdate(userId,{creditBalance: user.creditBalance - 1});

        res.json({
            success: true,
            message: "Image generated successfully",
            creditBalance: user.creditBalance - 1,
            resultImage
        });
    }
    catch(error){
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

export { generateImage };
