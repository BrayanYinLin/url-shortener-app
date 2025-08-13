import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { routerAuth } from './features/auth/auth.router'
import { routerLink } from './features/link/link.router'
import { corsOrigins, preflight } from '../middlewares/cors-origins'

const app = express()

app.use(corsOrigins())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// 3. Rutas de la API
app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)

// 4. Configuraciones adicionales
app.disable('x-powered-by')
app.options('*', preflight())

// 5. Se exporta la app configurada
export { app }
