import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/definitions'
import { z } from 'zod'
import {
  CreateLinkDto,
  DeleteLinkDto,
  LinkSchema,
  UpdateLinkDto
} from '../dto/link.dto'

class LinkService {
  static async findUserLinks() {
    const { data: recovered, status } = await api.get(
      ENDPOINTS.AUTH.concat('links')
    )

    if (status !== 200) {
      throw new Error('Link error')
    }

    const { success, data, error } = z.array(LinkSchema).safeParse(recovered)

    if (!success || error) {
      throw new Error('Link error')
    }

    return data
  }

  static async create(dto: CreateLinkDto) {
    const { data: created, status } = await api.post(ENDPOINTS.LINK, dto)

    if (status !== 201) {
      throw new Error('Link error')
    }

    const { success, data, error } = LinkSchema.safeParse(created)

    if (!success || error) {
      throw new Error('Link error')
    }

    return data
  }

  static async delete({ id }: DeleteLinkDto) {
    const { status } = await api.delete(ENDPOINTS.LINK.concat(id))

    if (status !== 200) {
      throw new Error('Link error')
    }
  }

  static async edit(dto: UpdateLinkDto) {
    const { data: edited, status } = await api.patch(ENDPOINTS.LINK, dto)

    if (status !== 200) {
      throw new Error('Link error')
    }

    const { success, data, error } = LinkSchema.safeParse(edited)

    if (!success || error) {
      throw new Error('Link error')
    }

    return data
  }
}

export { LinkService }
