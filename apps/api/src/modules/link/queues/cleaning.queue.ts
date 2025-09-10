import { JOBS, QUEUES } from '@shared/config/constants'
import { redisConnection } from '@shared/database/redis.source'
import { Queue } from 'bullmq'

const cleaningQueue = new Queue(QUEUES.CLEANING, {
  connection: redisConnection
})

const EACH_MINUTE = 1000 * 60

const scheduleCleaningJob = async () => {
  await cleaningQueue.upsertJobScheduler(JOBS.CLEANING_PROCESS, {
    every: EACH_MINUTE
  })
}

export { scheduleCleaningJob }
