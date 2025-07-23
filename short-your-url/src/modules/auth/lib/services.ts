import { ENDPOINTS } from '@/lib/definitions'
import { GoogleAuthenticationError } from '@/lib/errors'

export const getGithubData = async ({ search }: { search: string }) => {
  const urlParams = new URLSearchParams(search)
  const code = urlParams.get('code')

  if (code) {
    try {
      const response = await fetch(
        `${ENDPOINTS.AUTH}github/callback?code=${code}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error fetching user data')
      }

      const user = await response.json()
      localStorage.setItem('user', JSON.stringify(user))

      return user
    } catch (e) {
      console.error('Error fetching user data:', e)
      throw e
    }
  }
}

export const authenticateGoogle = async ({ search }: { search: string }) => {
  const urlParams = new URLSearchParams(search)
  const code = urlParams.get('code')

  if (code) {
    try {
      const response = await fetch(
        `${ENDPOINTS.AUTH}google/callback?code=${code}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        const { msg } = await response.json()
        throw new GoogleAuthenticationError(msg)
      }

      const user = await response.json()
      localStorage.setItem('user', JSON.stringify(user))

      return user
    } catch (e) {
      if (e instanceof GoogleAuthenticationError) {
        console.error(e.message)
      }
      throw e
    }
  }
}
