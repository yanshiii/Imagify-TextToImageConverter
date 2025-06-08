import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

const sendEmail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,                // smtp.gmail.com
    port: +process.env.SMTP_PORT,               // 587
    secure: +process.env.SMTP_PORT === 465,     // false for 587 (TLS)
    auth: {
      user: process.env.SMTP_USER,              // imagifyconverter@gmail.com
      pass: process.env.SMTP_PASSWORD,          // app password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,          // “imagifyconverter@gmail.com”
    to: email,
    subject,
    html,
    text: htmlToText(html),
  };

  console.log('📧 Sending mail:', {
    to: mailOptions.to,
    subject: mailOptions.subject,
    htmlLen: mailOptions.html.length,
  });

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
