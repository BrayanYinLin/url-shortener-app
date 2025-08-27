import { LogMetricDto } from '@link/entities/dtos/link.dto'
import { LinkServiceImpl } from '@link/services/link.service'
import { QUEUES } from '@shared/config/constants'
import { AppDataSource } from '@shared/database/data-source'
import { redisConnection } from '@shared/database/redis.source'
import logger from '@shared/utils/logger'
import { Job, Worker } from 'bullmq'

async function bootstrap() {
  await AppDataSource.initialize()
  logger.info('📦 Worker DB connection ready')

  const service = new LinkServiceImpl()

  const worker = new Worker<LogMetricDto>(
    QUEUES.METRIC,
    async ({ data }: Job<LogMetricDto>) => {
      const { id, referer, userAgent, accessDate } = data
      await service.logClicks({ id: String(id) })
      await service.logMetrics({ id, referer, userAgent, accessDate })
    },
    { connection: redisConnection, concurrency: 3 }
  )

  worker.on('ready', () =>
    logger.info(`✅ Worker ready for queue: ${QUEUES.METRIC}`)
  )
  worker.on('completed', (job) =>
    logger.info(`🎯 Job completed for link ${job.data.id}`)
  )
  worker.on('failed', (job, err) =>
    logger.error(
      `💥 Job failed for link ${job?.data?.id}, error: ${err.message}`
    )
  )
}

bootstrap()
