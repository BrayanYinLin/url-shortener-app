import { env_jwt_secret } from '@shared/config/enviroment'
import { sign, verify } from 'jsonwebtoken'
import { User } from './entities/user.entity'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'

export const decryptToken = async (jwt: string) => {
  if (!env_jwt_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'JWT secret not provided',
      isOperational: false
    })
  }

  const secret = verify(jwt, env_jwt_secret)

  return secret
}

export const encryptUser = ({ payload }: { payload: User }) => {
  if (!env_jwt_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'JWT secret not provided',
      isOperational: false
    })
  }

  const access = sign(payload, env_jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '2h'
  })

  const refresh = sign({ id: payload.id! }, env_jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '15d'
  })

  return { access, refresh }
}
