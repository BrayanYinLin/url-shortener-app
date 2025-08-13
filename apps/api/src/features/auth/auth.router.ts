import { Router } from 'express'
import { AuthCtrl } from './auth.controller'
import passport from 'passport'

const routerAuth = Router()
const controller = new AuthCtrl()

routerAuth.get('/', controller.auth.bind(controller))

routerAuth.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

routerAuth.get('/github/callback', controller.callbackGithub.bind(controller))

routerAuth.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
routerAuth.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  controller.callbackGoogle.bind(controller)
)

routerAuth.get('/refresh', controller.refresh.bind(controller))

routerAuth.post('/logout', controller.logout.bind(controller))

export { routerAuth }
