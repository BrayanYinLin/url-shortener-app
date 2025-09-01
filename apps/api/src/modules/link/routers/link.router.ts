import { Router } from 'express'
import { LinkCtrl } from '../controllers/link.controller'
import { checkTokens } from '../middlewares/check-tokens'

const routerLink = Router()
const controller = new LinkCtrl()

routerLink.get('/:short', controller.findLinkByShort.bind(controller))
// routerLink.get(
//   '/user',
//   checkTokens,
//   controller.findEveryLinksByUser.bind(controller)
// )
routerLink.post('/', checkTokens, controller.createLink.bind(controller))
routerLink.patch('/:id', checkTokens, controller.editLink.bind(controller))
routerLink.delete(
  '/:id',
  checkTokens,
  controller.deleteLinkById.bind(controller)
)

export { routerLink }
