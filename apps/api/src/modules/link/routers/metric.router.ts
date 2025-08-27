import { MetricCtrl } from '@link/controllers/metric.controller'
import { checkTokens } from '@link/middlewares/check-tokens'
import { Router } from 'express'

const createMetricRouter = (controller: MetricCtrl) => {
  const router = Router()

  router.get(
    '/:linkId',
    checkTokens,
    controller.findAllByLinkId.bind(controller)
  )

  return router
}

const routerMetric = createMetricRouter(new MetricCtrl())

export { routerMetric }
