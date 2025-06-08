import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

console.log("Email being sent with options:");
console.log(mailOptions);


const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // const mailOptions = {
    //     from: process.env.SMTP_FROM_EMAIL,
    //     to: options.email,
    //     subject: options.subject,
    //     html: options.html,
    //     text: options.text || htmlToText(options.html),
    // };

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: 'yanshisharma10@gmail.com',  // your real inbox
        subject: 'Test Email',
        html: '<h2>This is a test email</h2><p>Sent from Imagify</p>',
        text: 'This is a test email sent from Imagify',
};


    await transporter.sendMail(mailOptions);
};

export default sendEmail;
