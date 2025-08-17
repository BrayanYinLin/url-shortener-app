import { decode } from '@root/modules/auth/authentication'
import { Link } from '../entities/link.entity'
import {
  AuthContext,
  CreateLinkInput,
  DeleteParams,
  EditLinkInput,
  LinkService,
  ShortParams
} from '../link'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { AppDataSource } from '@shared/database/data-source'
import { User } from '@root/modules/auth/entities/user.entity'
import {
  CreateLinkSchema,
  EditLinkSchema,
  ResponseLinkDto
} from '../entities/dtos/link.dto'

class LinkServiceImpl implements LinkService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User),
    private readonly linkRepository = AppDataSource.getRepository(Link)
  ) {}

  async findLinksByUser({ token }: AuthContext): Promise<Link[]> {
    const { sub } = await decode(token)

    if (!sub) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const userLinks = await this.userRepository.findOne({
      where: { id: sub },
      relations: ['links']
    })

    if (!userLinks) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const { links } = userLinks

    return links
  }

  async create({ linkDto, token }: CreateLinkInput): Promise<Link> {
    const { sub } = await decode(token)

    if (!sub) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const user = await this.userRepository.findOne({
      where: { id: sub }
    })

    if (!user) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const { success, data, error } = CreateLinkSchema.safeParse(linkDto)

    if (!success || !data) {
      throw new AppError({
        code: ERROR_NAMES.VALIDATION,
        httpCode: ERROR_HTTP_CODES.VALIDATION,
        message: 'Link validation failed',
        isOperational: true,
        details: error
      })
    }

    const duplicated = await this.linkRepository.findOne({
      where: { short: data.short }
    })

    if (duplicated) {
      throw new AppError({
        code: ERROR_NAMES.CONFLICT,
        httpCode: ERROR_HTTP_CODES.CONFLICT,
        message: 'Link short name already exists',
        isOperational: true,
        details: error
      })
    }

    const link = this.linkRepository.create({
      long: data.long,
      short: data.short,
      expiresAt: data.expiresAt,
      user: user
    })

    return await this.linkRepository.save(link)
  }

  async edit({ id, linkDto, token }: EditLinkInput): Promise<Link> {
    const { sub } = await decode(token)

    if (!sub) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const user = await this.userRepository.findOne({
      where: { id: sub }
    })

    if (!user) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'User not found',
        isOperational: true
      })
    }

    const { success, data, error } = EditLinkSchema.safeParse(linkDto)

    if (!success || !data) {
      throw new AppError({
        code: ERROR_NAMES.VALIDATION,
        httpCode: ERROR_HTTP_CODES.VALIDATION,
        message: 'Link validation failed',
        isOperational: true,
        details: error
      })
    }

    const duplicated = await this.linkRepository.findOne({
      where: { id: id }
    })

    if (!duplicated) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Link not found',
        isOperational: true,
        details: error
      })
    }

    const link = this.linkRepository.create({
      long: data.long,
      short: duplicated.short,
      expiresAt: duplicated.expiresAt,
      user: user
    })

    return await this.linkRepository.save(link)
  }

  async findByShort({ short }: ShortParams): Promise<ResponseLinkDto> {
    const link = await this.linkRepository.findOne({
      where: {
        short
      }
    })

    if (!link) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Link not found',
        isOperational: true
      })
    }

    return {
      long: link.long
    }
  }

  async increaseClicksCounter({ short }: ShortParams): Promise<void> {
    const link = await this.linkRepository.findOne({
      where: {
        short
      }
    })

    if (!link) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Link not found',
        isOperational: true
      })
    }

    await this.linkRepository.save({
      ...link,
      clicks: link.clicks++
    })
  }

  async delete({ id }: DeleteParams): Promise<boolean> {
    const { affected } = await this.linkRepository.delete({ id })

    return Boolean(affected)
  }
}

export { LinkServiceImpl }
