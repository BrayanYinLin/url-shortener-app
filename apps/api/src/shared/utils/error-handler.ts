import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppError } from './error-factory'
import { ERROR_NAMES } from '@shared/config/constants'

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<Response | void> => {
  if (err instanceof AppError) {
    console.info(req.path)
    if (
      err.code === ERROR_NAMES.NOT_FOUND &&
      req.path.includes('/api/link/') &&
      req.query.short
    ) {
      return res.redirect(301, 'http://localhost:5173/not-found')
    }

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
