import { env_jwt_secret } from '@shared/config/enviroment'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { User } from './entities/user.entity'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'

export const decode = async (jwt: string) => {
  if (!env_jwt_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'JWT secret not provided',
      isOperational: false
    })
  }

  const payload = verify(jwt, env_jwt_secret) as JwtPayload

  return payload
}

export const encode = ({ payload }: { payload: User }) => {
  if (!env_jwt_secret) {
    throw new AppError({
      code: ERROR_NAMES.INTERNAL,
      httpCode: ERROR_HTTP_CODES.INTERNAL,
      message: 'JWT secret not provided',
      isOperational: false
    })
  }

  const { id, name } = payload

  const accessPayload = {
    sub: id,
    name
  }

  const access = sign(accessPayload, env_jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '2h'
  })

  const refreshPayload = {
    sub: id,
    jti: randomUUID()
  }

  const refresh = sign(refreshPayload, env_jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '15d'
  })

  return { access, refresh }
}
