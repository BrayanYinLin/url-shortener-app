import { ENDPOINTS } from '@/lib/definitions'
import { TokenNotRefreshed } from '@/lib/errors'

export const refreshUser = async () => {
  const response = await fetch(ENDPOINTS.AUTH.concat('refresh'), {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    const { msg } = await response.json()
    throw new TokenNotRefreshed(msg)
  }
}
