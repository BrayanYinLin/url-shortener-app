import { Link } from '@link/entities/link.entity'
import { Metric } from '@link/entities/metric.entity'
import { scheduleCleaningJob } from '@link/queues/cleaning.queue'
import { QUEUES } from '@shared/config/constants'
import { AppDataSource } from '@shared/database/data-source'
import { redisConnection } from '@shared/database/redis.source'
import logger from '@shared/utils/logger'
import { Worker } from 'bullmq'

const init = async () => {
  await AppDataSource.initialize()

  const worker = new Worker(
    QUEUES.CLEANING,
    async () => {
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Metric)
        .where('link_id IN (SELECT id FROM link WHERE expiresAt < NOW())')
        .execute()

      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Link)
        .where('expiresAt < NOW()')
        .execute()
    },
    {
      connection: redisConnection,
      concurrency: 1
    }
  )

  worker.on('ready', () => {
    logger.info(`✅ Worker ready for queue: ${QUEUES.CLEANING}`)
  })

  worker.on('completed', () => logger.info(`🎯 Links cleaned`))

  worker.on('failed', (_, err) =>
    logger.error(`💥 Job failed cleaning links ${err.message}`)
  )
}

init().then(async () => {
  await scheduleCleaningJob()
})
