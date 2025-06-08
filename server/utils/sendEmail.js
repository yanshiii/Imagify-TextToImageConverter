import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

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

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.html,
        text: options.text || htmlToText(options.html),
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
