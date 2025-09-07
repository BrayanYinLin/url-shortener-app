// import { join } from 'node:path'

// const PATH_ENV = join(process.cwd(), '../../.env')
// process.loadEnvFile(PATH_ENV)

const {
  PORT: env_port_app,
  API_BASE: env_api_base = 'http://localhost:5173',
  GITHUB_CLIENT: env_github_client,
  GITHUB_SECRET: env_github_secret,
  GOOGLE_CLIENT: env_google_client,
  GOOGLE_SECRET: env_google_secret,
  GOOGLE_CALLBACK: env_google_callback,
  JWT_SECRET: env_jwt_secret,
  REDIS_HOST: env_redis_host,
  REDIS_PORT: env_redis_port,
  POSTGRES_HOST: env_pg_host = 'localhost',
  POSTGRES_PORT: env_pg_port,
  POSTGRES_DATABASE: env_pg_db = 'db_shortener',
  POSTGRES_USER: env_pg_user = 'admin',
  POSTGRES_PASSWORD: env_pg_password,
  ENVIRONMENT: env_node = 'DEVELOPMENT'
} = process.env

export {
  env_port_app,
  env_api_base,
  env_github_client,
  env_github_secret,
  env_google_client,
  env_google_secret,
  env_google_callback,
  env_jwt_secret,
  env_redis_host,
  env_redis_port,
  env_pg_host,
  env_pg_port,
  env_pg_db,
  env_pg_user,
  env_pg_password,
  env_node
}
