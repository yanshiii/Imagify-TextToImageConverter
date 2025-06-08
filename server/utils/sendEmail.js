import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'YourApp <youremail@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.message,
    text: htmlToText(options.message),
  };

  console.log('Email being sent with options:', mailOptions);

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
