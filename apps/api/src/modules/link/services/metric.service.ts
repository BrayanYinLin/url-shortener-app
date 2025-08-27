import {
  FindMetricByLinkIdDto,
  ResponseMetricDto,
  ResponseMetricSchema
} from '@link/entities/dtos/metric.dto'
import { Metric } from '@link/entities/metric.entity'
import { MetricService } from '@link/link'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { AppDataSource } from '@shared/database/data-source'
import { AppError } from '@shared/utils/error-factory'

class MetricServiceImpl implements MetricService {
  constructor(
    private readonly metricRepo = AppDataSource.getRepository(Metric)
  ) {}

  async findAllByLinkId({
    id
  }: FindMetricByLinkIdDto): Promise<ResponseMetricDto[]> {
    const metrics = await this.metricRepo.find({
      where: {
        link: {
          id: id
        }
      },
      relations: ['link']
    })

    const metricsMapped = metrics.map((metric) => {
      const { success, data, error } = ResponseMetricSchema.safeParse(metric)

      if (!success || error) {
        throw new AppError({
          code: ERROR_NAMES.VALIDATION,
          httpCode: ERROR_HTTP_CODES.VALIDATION,
          message: 'Metric validations failed.',
          isOperational: true,
          details: error
        })
      }

      return data
    })

    return metricsMapped
  }
}

export { MetricServiceImpl }
