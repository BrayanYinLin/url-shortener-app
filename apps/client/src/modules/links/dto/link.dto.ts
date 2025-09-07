import { z } from 'zod'

export const DeleteLinkSchema = z.object({
  id: z.string().uuid()
})

export const CreateLinkSchema = z.object({
  long: z.string().url('Debe ser una URL válida'),
  short: z.string().min(3, 'El short debe tener al menos 3 caracteres'),
  expiresAt: z.string().datetime({ offset: true }).nullable().optional()
})

export const UpdateLinkSchema = z.object({
  id: z.string().uuid(),
  long: z.string().url().optional()
})

export const LinkSchema = z.object({
  id: z.string().uuid(),
  long: z.string().url(),
  short: z.string(),
  clicks: z.number().int().nonnegative(),
  expiresAt: z.string().datetime().nullable().optional()
})

export type DeleteLinkDto = z.infer<typeof DeleteLinkSchema>
export type CreateLinkDto = z.infer<typeof CreateLinkSchema>
export type UpdateLinkDto = z.infer<typeof UpdateLinkSchema>
export type LinkDto = z.infer<typeof LinkSchema>
