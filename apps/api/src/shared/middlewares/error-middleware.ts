import { handler } from '@shared/utils/error-handler'
import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<Response | void> => {
  await handler.handleHttpError(err, req, res)
}
