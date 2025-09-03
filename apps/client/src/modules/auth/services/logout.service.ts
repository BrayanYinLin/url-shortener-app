import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/definitions'

export const logout = async (): Promise<boolean> => {
  const res = await api.post(ENDPOINTS.AUTH.concat('logout'))

  if ([200, 201].some((code) => code === res.status) === false) {
    throw new Error('there was an error at logout')
  }

  localStorage.removeItem('user')

  return true
}
