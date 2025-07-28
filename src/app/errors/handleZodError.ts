import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  const statusCode = 422;
  const message = 'Validation Error';
  const errorMessages = error?.issues?.map((issue) => ({
    path: issue?.path[0],
    message: issue?.message,
  }));

  return {
    statusCode,
    message,
    errorMessages,
  };
};
