import { z } from 'zod'

const LogMetricSchema = z.object({
  id: z.string().uuid(),
  referer: z.string().url().nullable(),
  userAgent: z.string().nullable(),
  accessDate: z.string().datetime()
})

type LogMetricDto = z.infer<typeof LogMetricSchema>

const CreateLinkSchema = z.object({
  long: z.string().url(),
  short: z.string(),
  expiresAt: z.string().datetime({ offset: true }).nullable()
})

type CreateLinkDto = z.infer<typeof CreateLinkSchema>

const EditLinkSchema = z.object({
  long: z.string().url()
})

type EditLinkDto = z.infer<typeof EditLinkSchema>

const ResponseLinkSchema = z.object({
  id: z.string().uuid(),
  long: z.string().url()
})

type ResponseLinkDto = z.infer<typeof ResponseLinkSchema>

export {
  CreateLinkSchema,
  CreateLinkDto,
  LogMetricSchema,
  LogMetricDto,
  EditLinkSchema,
  EditLinkDto,
  ResponseLinkSchema,
  ResponseLinkDto
}
