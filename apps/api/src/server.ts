import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { routerAuth } from './modules/auth/routers/auth.router'
import { routerLink } from '@link/routers/link.router'
import { corsOrigins, preflight } from '@shared/middlewares/cors-origins'
import { handleError } from '@shared/utils/error-handler'
import helmet from 'helmet'
import passport from 'passport'
import { swaggerDocs } from '@shared/docs/parse-docs'
import swaggerUI from 'swagger-ui-express'
import logger from '@shared/utils/logger'
import { worker } from '@link/workers/metric.worker'

const app = express()

app.use(corsOrigins())
app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim())
    }
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.options('*', preflight())

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)
app.use(handleError)

worker.on('completed', (job, res) => {
  const { id } = job.data
  logger.info(`Link ${id} completed with result ${res}`)
})

export { app }
