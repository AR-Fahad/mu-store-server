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

export const AuthController = {
  createUser,
  verifyUserOTP,
};
