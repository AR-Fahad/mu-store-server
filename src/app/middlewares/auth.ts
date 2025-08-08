import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { jwtVerify } from '../utils/jwtToken';
import config from '../config';
import { User } from '../modules/auth/user.model';

type TRoles = 'admin' | 'customer' | 'seller';

const auth = (...requiredRoles: TRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; // add bearer before token separating with a space

    if (!accessToken) {
      throw new AppError(
        401,
        'Authorization',
        'You are not authorized! Please login first.',
      );
    }

    req.user = jwtVerify(
      accessToken,
      config.jwtAccessSecret as string,
    ) as JwtPayload;

    const { userId, email, role } = req.user;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'role', 'You are not authorized.');
    }

    const user = await User.findOne({ _id: userId, email, role });

    if (!user) {
      throw new AppError(404, 'User', 'User not found.');
    }

    if (user?.status === 'blocked') {
      throw new AppError(403, 'status', 'Your account is blocked.');
    }

    if (user?.status === 'inactive') {
      throw new AppError(403, 'status', 'Your account is inactive.');
    }

    next();
  });
};

export default auth;
