import 'reflect-metadata'
import { app } from './server'
import { env_port_app } from './shared/config/enviroment'
import { AppDataSource } from './shared/database/data-source'

const port = Number(env_port_app) || 5373

app.listen(port, async () => {
  await AppDataSource.initialize()

  console.log(`Server running on port ${port}`)
})
