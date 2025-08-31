import { create } from 'zustand'
import { PAGES } from '@/config/constants'
import { z } from 'zod'
import { createLink, deleteLink } from './services'

const includes = (name: string) =>
  Object.values(PAGES).some((link) => name === link)

export const CreateLinkSchema = z.object({
  short: z.string().refine((val) => !includes(val)),
  long: z.string().url(),
  expiresAt: z.string().datetime().nullable()
})

export type CreateLinkDto = z.infer<typeof CreateLinkSchema>

export const LinkIdSchema = z.object({
  id: z.string().uuid()
})

export type LinkIdDto = z.infer<typeof LinkIdSchema>

export interface LinkStore {
  shortLink: (dto: CreateLinkDto) => Promise<void>
  deleteLink: (dto: LinkIdDto) => Promise<void>
}

export const useLinkStore = create<LinkStore>(() => ({
  shortLink: async (dto: CreateLinkDto) => {
    try {
      await createLink(dto)
    } catch (e) {
      console.error(e)
    }
  },
  deleteLink: async (dto: LinkIdDto) => {
    try {
      await deleteLink(dto)
    } catch (e) {
      console.error(e)
    }
  }
}))
