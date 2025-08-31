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

        // 1. Si es asset interno de Vite (evitamos romper HMR)
        if (
          url.startsWith('/@vite') ||
          url.startsWith('/node_modules') ||
          url.includes('.vite') ||
          hasExtension
        ) {
          return next()
        }

        // 2. Si es ruta del front declarada → dejar que React Router maneje
        if (FRONT_ROUTES.includes(url)) {
          return next()
        }

        // 3. Si la ruta empieza con /api → ya está cubierta por el proxy normal
        if (url.startsWith('/api')) {
          return next()
        }

        // 4. Caso especial: rutas dinámicas tipo /abs-12 → redirigir al backend
        // Reescribe /abs-12 → /api/link/abs-12

        // Maneja la logica para evitar navegacion especulativa

        if (/^\/[a-zA-Z0-9_-]+$/.test(url)) {
          if (isPrefetch) {
            // console.log('[Middleware] Ignorando prefetch de:', url)
            res.statusCode = 204
            return res.end()
          }
          // console.log('[Middleware] Redirecting to backend:', `/api/link${url}`)
          req.url = `/api/link${url}`
          return server.middlewares.handle(req, res, next)
        }

        return next()
      })
    }
  }
}
