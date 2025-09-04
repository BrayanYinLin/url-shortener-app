import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { env_jwt_secret } from '@shared/config/enviroment'
import { AppError } from '@shared/utils/error-factory'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const checkTokens = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  try {
    if (!access_token && refresh_token) {
      throw new AppError({
        code: ERROR_NAMES.AUTHENTICATION,
        httpCode: ERROR_HTTP_CODES.AUTHENTICATION,
        message: 'Missing access_token',
        isOperational: true
      })
    }

    if (!access_token && !refresh_token) {
      throw new AppError({
        code: ERROR_NAMES.AUTHENTICATION,
        httpCode: ERROR_HTTP_CODES.AUTHENTICATION,
        message: 'Missing access_token and refresh_token',
        isOperational: true
      })
    }

    verify(access_token, env_jwt_secret!)
    verify(refresh_token, env_jwt_secret!)
    next()
  } catch (e) {
    next(e)
    return
  }
}
