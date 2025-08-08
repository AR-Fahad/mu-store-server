import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
  quiet: true,
});

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  emailUser: process.env.NODEMAILER_AUTH_USER,
  emailAppPass: process.env.NODEMAILER_AUTH_PASS,
  jwtOtpSecret: process.env.JWT_OTP_SECRET,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtResetSecret: process.env.JWT_RESET_SECRET,
  clientUrl: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV,
};
