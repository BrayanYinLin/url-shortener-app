import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/definitions'
import { UnexpectedError } from '@/lib/errors'
import { User } from '@/lib/stores'

export const authentication = async () => {
  const response = await api(ENDPOINTS.AUTH)

  if (response.status !== 200) {
    throw new UnexpectedError(response.data)
  }

  const user: User = await response.data

  return user
}
