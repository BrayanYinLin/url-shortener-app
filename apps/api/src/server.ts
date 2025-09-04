import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { routerAuth } from './modules/auth/routers/auth.router'
import { routerLink } from '@link/routers/link.router'
import helmet from 'helmet'
import passport from 'passport'
import { swaggerDocs } from '@shared/docs/parse-docs'
import swaggerUI from 'swagger-ui-express'
import logger from '@shared/utils/logger'
import { errorMiddleware } from '@shared/middlewares/error-middleware'
import { routerMetric } from '@link/routers/metric.router'

const app = express()

app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim())
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

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)
app.use('/api/metric', routerMetric)
app.get('/api/ping', (_: Request, res: Response) => {
  return res.send('API Running')
})
app.use(errorMiddleware)

export { app }
