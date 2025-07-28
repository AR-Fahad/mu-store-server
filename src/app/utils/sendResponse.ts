import { Response } from 'express';

type TPayload<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data?: T;
};

export const sendResponse = async <T>(res: Response, payload: TPayload<T>) => {
  const { success, statusCode, message, token, data } = payload;

  const jsonData: TPayload<T> = {
    success,
    statusCode,
    message,
  };

  if (token) {
    jsonData.token = token;
    jsonData.data = data;
  } else if (data !== 'undefined') {
    jsonData.data = data;
  }

  res.status(statusCode).json(jsonData);
};
