import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (email: string, subject: string, html: string) => {
  // Configure nodemailer transporter (example with Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: config.nodeEnv === 'production',
    port: config.nodeEnv === 'production' ? 465 : 587,
    auth: {
      user: config.emailUser,
      pass: config.emailAppPass,
    },
  });

  const mailOptions = {
    name: 'MU Hub',
    from: config.emailUser,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
