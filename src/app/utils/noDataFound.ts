import { Response } from 'express';
import { sendResponse } from './sendResponse';

export const noDataFound = async (res: Response) => {
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: 'No Data Found',
    data: [],
  });
};
