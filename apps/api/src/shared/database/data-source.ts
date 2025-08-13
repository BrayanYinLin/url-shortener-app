import { DataSource } from 'typeorm'
import {
  env_pg_db,
  env_pg_host,
  env_pg_password,
  env_pg_port,
  env_pg_user
} from '../../config/enviroment'
import { User } from '../../features/auth/entities/user.entity'
import { Provider } from '../../features/auth/entities/provider.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env_pg_host,
  port: Number(env_pg_port),
  username: env_pg_user,
  password: env_pg_password,
  database: env_pg_db,
  synchronize: true,
  logging: true,
  entities: [User, Provider],
  subscribers: [],
  migrations: []
})
