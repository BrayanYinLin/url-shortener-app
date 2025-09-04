import { env_redis_host, env_redis_port } from '@shared/config/enviroment'
import IORedis from 'ioredis'

const redisConnection = new IORedis({
  host: env_redis_host,
  port: Number(env_redis_port),
  maxRetriesPerRequest: null
})

export { redisConnection }
