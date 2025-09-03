import { refreshUser } from '@auth/services/refresh.service'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: '/',
  withCredentials: true
})

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

api.interceptors.response.use(
  (response) => response,
  async (e) => {
    const originalRequest = e.config as AxiosRequestConfigWithRetry

    if (e.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await refreshUser()
        return api(originalRequest)
      } catch (e) {
        console.error(e)
        throw new Error()
      }
    }
  }
)

export { api }
