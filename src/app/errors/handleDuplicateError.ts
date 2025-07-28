export const handleDuplicateError = (error: any) => {
  const statusCode = 409;
  const message = 'Duplicate Entry';
  const errorMessages = [
    {
      path:
        Object.keys(error?.errorResponse?.keyPattern)[0] ||
        Object.keys(error?.errorResponse?.keyValue)[0],
      message: error?.errorResponse?.errmsg,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};
