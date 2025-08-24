import { LogMetricDto } from '@link/entities/dtos/link.dto'
import { LinkServiceImpl } from '@link/services/link.service'
import { QUEUES } from '@shared/config/constants'
import { redisConnection } from '@shared/database/redis.source'
import { Job, Worker } from 'bullmq'

const worker = new Worker<LogMetricDto>(
  QUEUES.METRIC,
  async ({ data }: Job<LogMetricDto>) => {
    const { id, referer, userAgent, accessDate } = data
    const service = new LinkServiceImpl()

    await service.logClicks({ id: String(id) })
    await service.logMetrics({
      id: id,
      referer: referer,
      userAgent: userAgent,
      accessDate: accessDate
    })
  },
  { connection: redisConnection }
)

export { worker }
