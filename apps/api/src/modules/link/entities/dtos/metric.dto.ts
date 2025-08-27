import { z } from 'zod'

export const FindMetricByLinkIdSchema = z.object({
  id: z.string().uuid()
})

export type FindMetricByLinkIdDto = z.infer<typeof FindMetricByLinkIdSchema>

export const ResponseMetricSchema = z.object({
  userAgent: z.string(),
  referer: z.string().url(),
  accessDate: z.string().datetime()
})

export type ResponseMetricDto = z.infer<typeof ResponseMetricSchema>
