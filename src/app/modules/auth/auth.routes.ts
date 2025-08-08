import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  forgetPasswordValidation,
  resetPasswordValidation,
  userSigninValidation,
  userValidation,
  verifyEmailValidation,
} from './user.validation';
import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateRequest(userValidation),
  AuthController.createUser,
);

authRouter.post(
  '/verify-otp',
  validateRequest(verifyEmailValidation),
  AuthController.verifyUserOTP,
);

authRouter.post(
  '/signin',
  validateRequest(userSigninValidation),
  AuthController.signinUser,
);

authRouter.post(
  '/forget-password',
  validateRequest(forgetPasswordValidation),
  AuthController.forgetPassword,
);

authRouter.post(
  '/reset-password',
  validateRequest(resetPasswordValidation),
  AuthController.resetPassword,
);

export default authRouter;
