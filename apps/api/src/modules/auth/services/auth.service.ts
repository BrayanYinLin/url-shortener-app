import { AppDataSource } from '../../../shared/database/data-source'
import { NotFoundError } from '../../../common/errors'
import { CreateUserDTO, createUserDTO } from '../entities/dtos/user.dto'
import { Provider } from '../entities/provider.entity'
import { User } from '../entities/user.entity'
import { AccessToken, AuthenticationTokens, RefreshToken } from '../../../types'
import { decode, encode } from '../authentication'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_NAMES, ERROR_HTTP_CODES } from '@shared/config/constants'
import { Profile } from 'passport'
import { PROVIDERS } from '@root/common/definitions'

class AuthService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User),
    private readonly providerRepository = AppDataSource.getRepository(Provider)
  ) {}

  async auth({ access_token }: AccessToken): Promise<User> {
    const recovered = (await decode(access_token)) as User

    const user = await this.userRepository.findOne({
      where: {
        id: recovered.id
      },
      relations: ['provider']
    })

    if (!user) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: false
      })
    }

    return user
  }

  async refresh({
    refresh_token
  }: RefreshToken): Promise<AccessToken & { user: User }> {
    const { sub } = await decode(refresh_token)

    const user = await this.userRepository.findOne({
      where: {
        id: sub
      },
      relations: ['provider']
    })

    if (!user) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: false
      })
    }

    const { access } = encode({ payload: user })

    return { access_token: access, user }
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const { success, data } = createUserDTO.safeParse(userData)

    if (!success || !data) {
      throw new AppError({
        code: ERROR_NAMES.VALIDATION,
        httpCode: ERROR_HTTP_CODES.VALIDATION,
        message: 'User schema is not valid',
        isOperational: true
      })
    }

    const { name, email, avatar, provider: providerData } = data

    const provider = await this.providerRepository.findOne({
      where: { name: providerData.name }
    })

    if (!provider) {
      throw new NotFoundError(`Provider '${providerData.name}' not found`)
    }

    const newUser = this.userRepository.create({
      name,
      email,
      avatar,
      provider
    })

    return this.userRepository.save(newUser)
  }

  async callbackGithub(profile: Profile): Promise<AuthenticationTokens> {
    const userRepository = AppDataSource.getRepository(User)
    const providerRepository = AppDataSource.getRepository(Provider)

    if (!profile.emails) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Email was not found',
        isOperational: false
      })
    }

    const email = profile?.emails[0].value

    const existingUser = await userRepository.findOne({
      where: {
        email
      }
    })

    const githubProvider = await providerRepository.findOne({
      where: {
        name: PROVIDERS.GITHUB
      }
    })

    if (!githubProvider) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Github provider not found',
        isOperational: false
      })
    }

    const avatar = profile.photos ? profile.photos[0].value : ''

    let userRecord = existingUser
    if (!existingUser) {
      userRecord = await userRepository.save({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: githubProvider,
        avatar: avatar
      })
    }

    if (!userRecord) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: false
      })
    }

    const { access, refresh } = encode({ payload: userRecord })

    return {
      access_token: access,
      refresh_token: refresh
    }
  }

  async callbackGoogle(profile: Profile): Promise<AuthenticationTokens> {
    const userRepository = AppDataSource.getRepository(User)
    const providerRepository = AppDataSource.getRepository(Provider)

    if (!profile.emails) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Email was not found',
        isOperational: false
      })
    }

    const email = profile?.emails[0].value

    const existingUser = await userRepository.findOne({
      where: {
        email
      }
    })

    const googleProvider = await providerRepository.findOne({
      where: {
        name: 'Google'
      }
    })

    if (!googleProvider) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Google provider not found',
        isOperational: false
      })
    }

    const avatar = profile.photos ? profile.photos[0].value : ''
    let userRecord = existingUser
    if (!existingUser) {
      userRecord = await userRepository.save({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: googleProvider,
        avatar: avatar
      })
    }

    if (!userRecord) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: false
      })
    }

    const { access, refresh } = encode({ payload: userRecord })

    return {
      access_token: access,
      refresh_token: refresh
    }
  }
}

export { AuthService }
