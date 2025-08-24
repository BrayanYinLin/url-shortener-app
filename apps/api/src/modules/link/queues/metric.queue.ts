import { LogMetricDto } from '@link/entities/dtos/link.dto'
import { JOBS, QUEUES } from '@shared/config/constants'
import { redisConnection } from '@shared/database/redis.source'
import { Queue } from 'bullmq'

const metricQueue = new Queue(QUEUES.METRIC, { connection: redisConnection })

const addMetricsJob = async ({
  id,
  referer,
  accessDate,
  userAgent
}: LogMetricDto) => {
  await metricQueue.add(JOBS.LOG_METRIC, { id, referer, accessDate, userAgent })
}

export { addMetricsJob }
