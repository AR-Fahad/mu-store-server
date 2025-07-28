/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';

export const noRoutesFound = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  sendResponse(res, { success: false, statusCode: 404, message: 'Not Found' });
};
