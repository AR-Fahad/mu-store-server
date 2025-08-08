import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User token created successfully',
    token: result.verificationToken,
  });
});

const verifyUserOTP = catchAsync(async (req, res) => {
  const { token, otp } = req.body;
  const result = await AuthService.verifyUserOTP(token, otp);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const signinUser = catchAsync(async (req, res) => {
  const result = await AuthService.signinUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User signed in successfully',
    token: result.signinToken,
    data: result.userData,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthService.forgetPassword(email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Reset password link sent to your email',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  await AuthService.resetPassword(token, newPassword);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password reset successfully',
  });
});

export const AuthController = {
  createUser,
  verifyUserOTP,
  signinUser,
  forgetPassword,
  resetPassword,
};
