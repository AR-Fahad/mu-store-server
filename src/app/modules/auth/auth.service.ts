import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { jwtSignUp, jwtVerify } from '../../utils/jwtToken';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import sendEmail from '../../utils/sendEmail';
import { otpHtmlContent, resetHtmlContent } from '../../constant/htmlContent';

const createUser = async (userData: Partial<TUser>) => {
  const { email, role } = userData as TUser;

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw new AppError(409, 'email', 'User with this email already exists.');
  }

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
  await sendEmail(
    email,
    'Verify your email',
    otpHtmlContent.replace('{{OTP_CODE}}', otp),
  );

  return { verificationToken: token };
};

const verifyUserOTP = async (token: string, otpInput: string) => {
  const payload = jwtVerify(token, config.jwtOtpSecret as string) as JwtPayload;

  const { otp, password, ...userData } = payload;

  if (otp !== otpInput) {
    throw new Error('Invalid OTP');
  }

  const hash = await bcrypt.hash(password, 10);

  // Create isUser here with userData (hash password etc)
  const result = await User.create({ ...userData, password: hash });

  return result;
};

export const signinUser = async (payload: Partial<TUser>) => {
  const { email, password } = payload;
  const isUser = await User.findOne({ email }).select('+password');

  if (!isUser) {
    throw new AppError(401, 'email', 'Invalid email or password.');
  }

  const isMatch = await bcrypt.compare(
    password as string,
    isUser.password as string,
  );
  if (!isMatch) {
    throw new AppError(401, 'password', 'Invalid email or password.');
  }

  if (isUser.status === 'blocked') {
    throw new AppError(403, 'status', 'Your account is blocked.');
  }

  if (isUser.status === 'inactive') {
    throw new AppError(403, 'status', 'Your account is inactive.');
  }

  const signinToken = jwtSignUp(
    { userId: isUser._id, email, role: isUser.role },
    config.jwtAccessSecret as string,
    parseInt(config.jwtAccessExpiresIn as string),
  );

  const userData = await User.findById(isUser._id);

  return { signinToken, userData };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user || user.status === 'blocked' || user.status === 'inactive') {
    throw new AppError(
      404,
      'user',
      'User not found or account is blocked/inactive.',
    );
  }
  const resetToken = jwtSignUp({ email }, config.jwtResetSecret as string, 900);

  const resetLink = `${config.clientUrl}/auth/reset-password?token=${resetToken}`;

  await sendEmail(
    email,
    'Reset your password',
    resetHtmlContent.replace('{{RESET_LINK}}', resetLink),
  );
};

const resetPassword = async (token: string, newPassword: string) => {
  const payload = jwtVerify(
    token,
    config.jwtResetSecret as string,
  ) as JwtPayload;
  const { email } = payload;
  const newPass = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: newPass }, { new: true });
};

export const AuthService = {
  createUser,
  verifyUserOTP,
  signinUser,
  forgetPassword,
  resetPassword,
};
