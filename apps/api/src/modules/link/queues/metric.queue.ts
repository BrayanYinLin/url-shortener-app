import { LogMetricDto } from '@link/entities/dtos/link.dto'
import { JOBS, QUEUES } from '@shared/config/constants'
import { redisConnection } from '@shared/database/redis.source'
import logger from '@shared/utils/logger'
import { Queue } from 'bullmq'

const metricQueue = new Queue(QUEUES.METRIC, { connection: redisConnection })

const addMetricsJob = async ({
  id,
  referer,
  accessDate,
  userAgent
}: LogMetricDto) => {
  logger.info(`Trying to access ${id} at ${accessDate}`)
  await metricQueue.add(
    JOBS.LOG_METRIC,
    { id, referer, accessDate, userAgent },
    {
      removeOnComplete: true, // ❌ se borra automáticamente al completarse
      removeOnFail: true
    }
  )
}

export { addMetricsJob }
