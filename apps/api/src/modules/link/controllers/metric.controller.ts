import { MetricServiceImpl } from '@link/services/metric.service'
import { NextFunction, Request, Response } from 'express'

export class MetricCtrl {
  constructor(private readonly service = new MetricServiceImpl()) {}

  async findAllByLinkId(req: Request, res: Response, next: NextFunction) {
    const { linkId } = req.params

    try {
      const metrics = await this.service.findAllByLinkId({
        id: linkId
      })

      return res.json(metrics)
    } catch (e) {
      next(e)
    }
  }
}
