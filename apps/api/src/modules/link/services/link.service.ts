import { decode } from '@root/modules/auth/authentication'
import { Link } from '../entities/link.entity'
import {
  AuthContext,
  CreateLinkInput,
  DeleteParams,
  EditLinkInput,
  LinkService,
  LogClicksParams,
  ShortParams
} from '../link'
import { AppError } from '@shared/utils/error-factory'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { AppDataSource } from '@shared/database/data-source'
import { User } from '@root/modules/auth/entities/user.entity'
import {
  CreateLinkSchema,
  EditLinkSchema,
  LogMetricDto,
  ResponseLinkDto
} from '../entities/dtos/link.dto'
import { Metric } from '@link/entities/metric.entity'

class LinkServiceImpl implements LinkService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User),
    private readonly linkRepository = AppDataSource.getRepository(Link),
    private readonly metricRepository = AppDataSource.getRepository(Metric)
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

    duplicated.long = data.long

    return await this.linkRepository.save(duplicated)
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
      id: link.id,
      long: link.long
    }
  }

  async logClicks({ id }: LogClicksParams): Promise<void> {
    await this.linkRepository.increment({ id }, 'clicks', 1)
  }

  async logMetrics({
    id,
    referer,
    userAgent,
    accessDate
  }: LogMetricDto): Promise<void> {
    const link = await this.linkRepository.findOne({
      where: {
        id: id
      },
      relations: ['user']
    })

    if (!link) {
      throw new AppError({
        code: ERROR_NAMES.NOT_FOUND,
        httpCode: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Link not found.',
        isOperational: true
      })
    }

    const metric = this.metricRepository.create({
      link,
      referer,
      userAgent,
      accessDate
    })

    await this.metricRepository.save(metric)
  }

  async delete({ id }: DeleteParams): Promise<boolean> {
    const { affected } = await this.linkRepository.delete({ id })

    return Boolean(affected)
  }
}

export { LinkServiceImpl }
