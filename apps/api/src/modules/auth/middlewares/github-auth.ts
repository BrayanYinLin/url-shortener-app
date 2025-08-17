import passport, { Profile } from 'passport'
import {
  env_api_base,
  env_github_client,
  env_github_secret
} from '@shared/config/enviroment'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'

const createOauthGithubMiddleware = () => {
  if (!env_github_client || !env_github_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'Github credentials are not provided',
      isOperational: false
    })
  }

  const callbackURL = `${env_api_base}/api/auth/github/callback`

  passport.use(
    new GitHubStrategy(
      {
        clientID: env_github_client,
        clientSecret: env_github_secret,
        callbackURL
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        done: (error: any, user?: Express.User | false, info?: any) => void
      ) => {
        if (!profile.emails) {
          return done(null, false, {
            message: 'Email not found in Github profile'
          })
        }

        done(null, profile)
      }
    )
  )
}

createOauthGithubMiddleware()
