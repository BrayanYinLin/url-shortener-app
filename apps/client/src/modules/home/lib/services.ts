import { ENDPOINTS } from '@/lib/definitions'
import { TokenNotRefreshed, UnexpectedError } from '@/lib/errors'
import { refreshUser } from '@/lib/services'
import { User } from '@/lib/stores'

export const authentication = async () => {
  const init: RequestInit = {
    method: 'GET',
    credentials: 'include'
  }
  const response = await fetch(ENDPOINTS.AUTH, init)

  if (response.status === 401) {
    const refreshed = await refreshHandler(ENDPOINTS.AUTH, init)
    const user: User = await refreshed.json()
    return user
  }

  if (!response.ok) {
    const { msg } = await response.json()
    throw new UnexpectedError(msg)
  }

  const user: User = await response.json()

  return user
}

const refreshHandler = async (url: RequestInfo, init?: RequestInit) => {
  try {
    await refreshUser()
    return fetch(url, init)
  } catch {
    throw new TokenNotRefreshed('Sign in again')
  }
}
