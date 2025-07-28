import nodemailer from 'nodemailer';
import config from '../config';

const otpHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #333333;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
    }
    .otp-box {
      background-color: #f0f2f5;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      margin: 20px 0;
      color: #1a1a1a;
    }
    .footer {
      font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up. To complete your registration, please use the verification code below:</p>

      <div class="otp-box">{{OTP_CODE}}</div>

      <p>This code is valid for the next <strong>5 minutes</strong>. Do not share it with anyone.</p>
      <p>If you did not initiate this request, please ignore this email.</p>

      <p>Best regards,<br/>The Support Team</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} MU Hub. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const sendVerificationEmail = async (email: string, otp: string) => {
  // Configure nodemailer transporter (example with Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: config.emailUser,
      pass: config.emailAppPass,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Your Verification Code',
    html: otpHtmlContent.replace('{{OTP_CODE}}', otp),
  };

  await transporter.sendMail(mailOptions);
};
