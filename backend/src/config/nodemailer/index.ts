import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // Gmail SMTP server
  port: 587, // 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'reta12@ethereal.email', // your Gmail address
    pass: 'MnA3ME35GZabAHBeSk', // your Gmail app password or OAuth2 token
  },
});
