import express from 'express';
import type { Request, Response, NextFunction } from 'express-serve-static-core';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  console.error('ERROR 💥', err);

  // Prisma error handling
  if (err.name === 'PrismaClientKnownRequestError') {
    error.message = 'Database error occurred';
    (error as AppError).statusCode = 400;
  }

  // JWT error handling
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please log in again!';
    (error as AppError).statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Your token has expired! Please log in again.';
    (error as AppError).statusCode = 401;
  }

  // Send error response
  const statusCode = (error as AppError).statusCode || 500;
  res.status(statusCode).json({
    status: (error as AppError).status || 'error',
    message: error.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Async error handler wrapper
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};