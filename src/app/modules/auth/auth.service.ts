import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { jwtSignUp, jwtVerify } from '../../utils/jwtToken';
import { sendVerificationEmail } from '../../utils/sendEmail';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUser = async (userData: Partial<TUser>) => {
  const { email, role } = userData as TUser;

  if (role === 'admin') {
    throw new Error('Admin role cannot be created through this endpoint');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwtSignUp(
    { ...userData, otp },
    config.jwtOtpSecret as string,
    300,
  );

  // Send OTP email
  await sendVerificationEmail(email, otp);

  return { verificationToken: token };
};

const verifyUserOTP = async (token: string, otpInput: string) => {
  const payload = jwtVerify(token, config.jwtOtpSecret as string) as JwtPayload;

  const { otp, exp, iat, password, ...userData } = payload;

  if (otp !== otpInput) {
    throw new Error('Invalid OTP');
  }

  const hash = bcrypt.hash(password, 10);

  // Create user here with userData (hash password etc)
  const result = await User.create({ ...userData, password: hash });

  return result;
};

export const AuthService = {
  createUser,
  verifyUserOTP,
};
