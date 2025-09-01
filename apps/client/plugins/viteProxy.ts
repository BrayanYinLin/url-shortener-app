import { Plugin } from 'vite'

const FRONT_ROUTES = [
  '/',
  '/dashboard',
  '/signin',
  '/not-found',
  '/auth/github/callback',
  '/auth/google/callback'
]

export function viteProxy(): Plugin {
  return {
    name: 'filter-router-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '/'
        const method = req.method
        const purpose = req.headers['purpose']
        const hasExtension = /\.[a-zA-Z0-9]+$/.test(url)

        const isPrefetch = purpose === 'prefetch' || method !== 'GET'

        if (
          url.startsWith('/@vite') ||
          url.startsWith('/node_modules') ||
          url.includes('.vite') ||
          hasExtension
        ) {
          return next()
        }

        if (FRONT_ROUTES.includes(url)) {
          return next()
        }

        if (url.includes('undefined')) {
          req.url = `/not-found`
          return server.middlewares.handle(req, res, next)
        }

        if (url.startsWith('/api')) {
          return next()
        }

        if (/^\/[a-zA-Z0-9_-]+$/.test(url)) {
          if (isPrefetch) {
            res.statusCode = 204
            return res.end()
          }

          console.log('[→ Pre-Redirecting]', req.url)
          console.log('[→ Redirecting] ', url)
          req.url = `/api/link${url}`
          return server.middlewares.handle(req, res, next)
        }

        return next()
      })
    }
  }
}
