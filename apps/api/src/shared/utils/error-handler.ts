import { Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppError } from './error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import logger from './logger'

class ErrorHandler {
  public async handleHttpError(
    err: Error,
    req: Request,
    res: Response
  ): Promise<Response | void> {
    logger.error(err)
    if (err instanceof AppError) {
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
      return res.status(ERROR_HTTP_CODES.AUTHENTICATION).json({
        status: ERROR_HTTP_CODES.AUTHENTICATION,
        message: err.message,
        path: req.path
      })
    }

    return res.status(ERROR_HTTP_CODES.INTERNAL).json({
      status: ERROR_NAMES.INTERNAL,
      message: err.message ?? 'Internal Server Error.',
      path: req.path
    })
  }

  public handleProcessError(err: Error) {
    logger.error(err)
    process.exit(1)
  }
}

export const handler = new ErrorHandler()
