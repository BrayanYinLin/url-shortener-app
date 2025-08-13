import { NextFunction, Request, Response } from 'express'

const accessMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  if (!access_token && refresh_token) {
    return res.status(401).json({ msg: 'Refresh access' })
  } else if (!access_token && !refresh_token) {
    return res
      .status(401)
      .json({ msg: 'Missing authentication. Sign in again.' })
  }

  return next()
}

const refreshMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  if (!access_token && !refresh_token) {
    return res.status(401).json({ msg: 'missing authentication' })
  }

  return next()
}

export { accessMiddleware, refreshMiddleware }
