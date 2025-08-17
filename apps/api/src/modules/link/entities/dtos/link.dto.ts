import { z } from 'zod'

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
  long: z.string().url()
})

type ResponseLinkDto = z.infer<typeof ResponseLinkSchema>

export {
  CreateLinkSchema,
  CreateLinkDto,
  EditLinkSchema,
  EditLinkDto,
  ResponseLinkSchema,
  ResponseLinkDto
}
