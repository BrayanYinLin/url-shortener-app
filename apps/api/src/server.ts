import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { routerAuth } from './modules/auth/routers/auth.router'
import { routerLink } from '@link/routers/link.router'
import { corsOrigins, preflight } from '@shared/middlewares/cors-origins'
import { handleError } from '@shared/utils/error-handler'
import helmet from 'helmet'
import passport from 'passport'

const app = express()

app.use(corsOrigins())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.options('*', preflight())

app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)
app.use(handleError)

export { app }
