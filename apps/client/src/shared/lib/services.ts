import { ENDPOINTS } from './definitions'
import { TokenNotRefreshed } from './errors'

export const refreshUser = async () => {
  const response = await fetch(`${ENDPOINTS.AUTH}refresh`, {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    const { msg } = await response.json()
    throw new TokenNotRefreshed(msg)
  }
}
