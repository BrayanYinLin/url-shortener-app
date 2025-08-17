import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppError } from './error-factory'

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<Response | void> => {
  if (err instanceof AppError) {
    return res.status(Number(err.httpCode)).json({
      status: err.httpCode,
      message: err.message,
      path: req.path
    })
  }

  if (err instanceof JsonWebTokenError) {
    return res
      .status(401)
      .json({ status: 401, message: err.message, path: req.path })
  }

  return res.status(500).json({
    status: 'error',
    message: err.message ?? 'Internal Server Error',
    path: req.path
  })
}
