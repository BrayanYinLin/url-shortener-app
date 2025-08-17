import { ERROR_HTTP_CODES } from '@shared/config/constants'
import { NextFunction, Request, Response } from 'express'

export const checkTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  if (!access_token && refresh_token) {
    res.status(401).json({
      status: ERROR_HTTP_CODES.AUTHENTICATION,
      message: 'Missing access token',
      path: req.path
    })
  } else if (!access_token && !refresh_token) {
    res.status(401).json({
      status: ERROR_HTTP_CODES.AUTHENTICATION,
      message: 'Missing access token',
      path: req.path
    })
  }

  next()
}
