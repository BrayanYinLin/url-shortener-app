import passport, { Profile } from 'passport'
import {
  env_api_base,
  env_github_client,
  env_github_secret
} from '@shared/config/enviroment'
import { Strategy } from 'passport-github2'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { VerifyCallback } from 'passport-google-oauth20'

const createOauthGithubMiddleware = () => {
  if (!env_github_client || !env_github_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'Google credentials are not provided',
      isOperational: false
    })
  }

  const callbackURL = `${env_api_base}/api/v1/user/auth/google/callback`

  passport.use(
    'github',
    new Strategy(
      {
        clientID: env_github_client,
        clientSecret: env_github_secret,
        callbackURL
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        cb: VerifyCallback
      ) => {
        if (!profile.emails) {
          throw new AppError({
            code: ERROR_NAMES.AUTHENTICATION,
            httpCode: ERROR_HTTP_CODES.AUTHENTICATION,
            message: 'Email not found in Google profile',
            isOperational: true
          })
        }

        cb(null, profile)
      }
    )
  )
}

createOauthGithubMiddleware()
