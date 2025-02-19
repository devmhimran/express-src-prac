import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors.map((error) => ({
        field: error.path.join('.'),
        message: error.message || 'Invalid value',
      })),
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
