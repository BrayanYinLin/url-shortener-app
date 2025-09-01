import { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGES } from '../../../common/definitions'
import { LinkServiceImpl } from '../services/link.service'
import { ERROR_HTTP_CODES, ERROR_NAMES } from '@shared/config/constants'
import { timestampTz } from '@link/utils/date'
import { addMetricsJob } from '@link/queues/metric.queue'
import { AppError } from '@shared/utils/error-factory'
import logger from '@shared/utils/logger'

class LinkCtrl {
  constructor(private readonly service = new LinkServiceImpl()) {}

  async findEveryLinksByUser(req: Request, res: Response, next: NextFunction) {
    const access_token = req.cookies.access_token
    const refresh_token = req.cookies.refresh_token

    if (!access_token && refresh_token) {
      return res.status(401).json({ msg: 'Refresh access' })
    } else if (!access_token && !refresh_token) {
      return res.status(401).json({ msg: ERROR_MESSAGES.NOT_AUTHENTICATED })
    }

    try {
      const links = await this.service.findLinksByUser({ token: access_token })

      return res.json(links)
    } catch (e) {
      next(e)
    }
  }

  async createLink(req: Request, res: Response, next: NextFunction) {
    const access_token = req.cookies.access_token

    try {
      const link = await this.service.create({
        linkDto: req.body,
        token: access_token
      })

      return res.status(201).json(link)
    } catch (e) {
      next(e)
    }
  }

  async editLink(req: Request, res: Response, next: NextFunction) {
    const access_token = req.cookies.access_token
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ msg: ERROR_MESSAGES.MISSING_PARAM })
    }

    try {
      const editted = await this.service.edit({
        id,
        linkDto: req.body,
        token: access_token
      })

      return res.json(editted)
    } catch (e) {
      next(e)
    }
  }

  async findLinkByShort(req: Request, res: Response, next: NextFunction) {
    const { short } = req.params

    try {
      if (!Boolean(short)) {
        throw new AppError({
          code: ERROR_NAMES.NOT_FOUND,
          httpCode: ERROR_HTTP_CODES.NOT_FOUND,
          message: 'Short name not found',
          isOperational: true
        })
      }

      const link = await this.service.findByShort({
        short: String(short)
      })

      addMetricsJob({
        id: link.id,
        referer: req.headers.referer ?? '',
        userAgent: req.headers['user-agent'] ?? null,
        accessDate: timestampTz
      })

      res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0'
      })

      // El codigo 302 evita que el navegador cachee la redireccion y afecte a log de metricas
      return res.redirect(302, link.long)
    } catch (e) {
      next(e)
    }
  }

  async deleteLinkById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        status: ERROR_HTTP_CODES.NOT_FOUND,
        message: 'Id not provided',
        path: req.path
      })
    }

    try {
      const confirmed = await this.service.delete({ id })

      if (!confirmed) {
        return res.status(400).json({
          status: ERROR_HTTP_CODES.BAD_REQUEST,
          message: 'Link was not deleted',
          path: req.path
        })
      }

      return res.status(200).json({ msg: 'Deleted successfully' })
    } catch (e) {
      next(e)
    }
  }
}

export { LinkCtrl }
