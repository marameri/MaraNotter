import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.message,
      status: err.status,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default AppError;
