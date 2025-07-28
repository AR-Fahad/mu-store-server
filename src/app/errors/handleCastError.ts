import { Error } from 'mongoose';

export const handleCastError = (error: Error.CastError) => {
  const statusCode = 400;
  const message = 'Cast Error';
  const errorMessages = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};
