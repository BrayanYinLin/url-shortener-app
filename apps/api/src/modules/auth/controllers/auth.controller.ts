import { NextFunction, Request, Response } from 'express'
import {
  getClearCookiesSettings,
  setCookiesSettings
} from '../../../common/utils'
import { AuthService } from '../services/auth.service'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { setAuthCookies } from '../lib/auth-cookies'

class AuthCtrl {
  constructor(private readonly service = new AuthService()) {}

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token = req.cookies.access_token
      const user = await this.service.auth({ access_token })

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const refresh_token = req.cookies.refresh_token
    try {
      const { access_token, user } = await this.service.refresh({
        refresh_token
      })
      const { access_settings } = setCookiesSettings()

      return res
        .cookie('access_token', access_token, access_settings)
        .json(user)
    } catch (e) {
      next(e)
    }
  }

  async logout(_: Request, res: Response) {
    const { settings } = getClearCookiesSettings()
    return res
      .clearCookie('access_token', settings)
      .clearCookie('refresh_token', settings)
      .json({ msg: 'Log out succesfully' })
  }

  async callbackGithub(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError({
          code: ERROR_NAMES.AUTHENTICATION,
          httpCode: ERROR_HTTP_CODES.AUTHENTICATION,
          message: 'Email profile was not provided: ' + req.user,
          isOperational: true
        })
      }

      const { access_token, refresh_token } = await this.service.callbackGithub(
        req.user
      )

      return setAuthCookies(res, access_token, refresh_token).redirect(
        301,
        'http://localhost:5173/dashboard'
      )
    } catch (e) {
      next(e)
    }
  }

  async callbackGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError({
          code: ERROR_NAMES.AUTHENTICATION,
          httpCode: ERROR_HTTP_CODES.AUTHENTICATION,
          message: 'Email profile was not provided',
          isOperational: true
        })
      }
      const { access_token, refresh_token } = await this.service.callbackGoogle(
        req.user
      )

      return setAuthCookies(res, access_token, refresh_token).redirect(
        301,
        'http://localhost:5173/dashboard'
      )
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}

export { AuthCtrl }
