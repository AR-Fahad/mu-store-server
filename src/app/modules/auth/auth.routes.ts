import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation, verifyEmailValidation } from './user.validation';
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

export default authRouter;
