/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { TErrorMessages } from '../interfaces/error';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { handleCastError } from '../errors/handleCastError';
import { handleValidationError } from '../errors/handleValidationError';
import config from '../config';

export const globalErrorHandle = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let message: string = 'Custom Error';

  let statusCode: number = error?.statusCode || 500;

  let errorMessages: TErrorMessages = [
    {
      path: error?.path || '',
      message: error?.message || 'Something went wrong!',
    },
  ];

  if (error instanceof ZodError) {
    const err = handleZodError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.errorMessages as TErrorMessages;
  } else if (error?.errorResponse?.code === 11000 || error?.code === 11000) {
    const err = handleDuplicateError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.errorMessages as TErrorMessages;
  } else if (error?.name === 'CastError') {
    const err = handleCastError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.errorMessages as TErrorMessages;
  } else if (error?.name === 'ValidationError') {
    const err = handleValidationError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.errorMessages as TErrorMessages;
  }

  const authErrorMessage = error?.message;

  if (
    statusCode === 401 &&
    authErrorMessage === 'You have no access to this route'
  ) {
    res.status(error.statusCode).json({
      success: false,
      statusCode,
      message: authErrorMessage,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: config.nodeEnv === 'development' ? error?.stack : null,
      // error,
    });
  }
};
