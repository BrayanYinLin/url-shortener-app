import { Router } from 'express'
import { AuthCtrl } from '../controllers/auth.controller'
import passport from 'passport'
import '@auth/middlewares/github-auth'
import '@auth/middlewares/google-auth'

const routerAuth = Router()
const controller = new AuthCtrl()

routerAuth.get('/', controller.auth.bind(controller))

routerAuth.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    failureRedirect: 'http://localhost:5173/signin?error=github_email_missing'
  })
)
routerAuth.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: 'http://localhost:5173/signin?error=github_email_missing'
  }),
  controller.callbackGithub.bind(controller)
)

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
