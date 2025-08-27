import {
  CreateLinkDto,
  LogMetricDto,
  ResponseLinkDto
} from './entities/dtos/link.dto'
import {
  FindMetricByLinkIdDto,
  ResponseMetricDto
} from './entities/dtos/metric.dto'
import { Link } from './entities/link.entity'

type AuthContext = { token: string }
type CreateLinkInput = { linkDto: CreateLinkDto } & AuthContext
type EditLinkInput = { id: string; linkDto: CreateLinkDto } & AuthContext
type ShortParams = { short: string }
type LogClicksParams = { id: string }
type DeleteParams = { id: string }

export interface LinkService {
  findLinksByUser({ token }: AuthContext): Promise<Link[]>
  create({ linkDto, token }: CreateLinkInput): Promise<Link>
  edit({ id, linkDto, token }: EditLinkInput): Promise<Link>
  findByShort({ short }: ShortParams): Promise<ResponseLinkDto>
  logClicks({ id }: LogClicksParams): Promise<void>
  logMetrics({ id }: LogMetricDto): Promise<void>
  delete({ id }: DeleteParams): Promise<boolean>
}

export interface MetricService {
  findAllByLinkId({ id }: FindMetricByLinkIdDto): Promise<ResponseMetricDto[]>
}
