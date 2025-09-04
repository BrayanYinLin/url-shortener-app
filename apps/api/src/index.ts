import 'reflect-metadata'
import { app } from './server'
import { env_port_app } from './shared/config/enviroment'
import { AppDataSource } from './shared/database/data-source'
import { createProviders } from '@shared/database/provider.seed'
import logger from '@shared/utils/logger'
import { handler } from '@shared/utils/error-handler'

const port = Number(env_port_app) || 5373

const init = async () => {
  try {
    await AppDataSource.initialize()
    await createProviders()
    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port}`)
    })
  } catch (err) {
    logger.error(
      `❌ Error al inicializar la aplicación: ${(err as Error).message}`
    )
    logger.error((err as Error).stack)

    process.exit(1)
  }
}

init()

process.on('uncaughtException', (e) => {
  handler.handleProcessError(e)
})
