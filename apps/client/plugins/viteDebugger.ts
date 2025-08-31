import { Plugin } from 'vite'

export function viteDebugger(): Plugin {
  return {
    name: 'vite-debugger',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || ''

        if (url.startsWith('/api')) {
          console.log('[→ API]', url)
          return next() // aquí proxy al backend si quieres
        }

        if (
          url.startsWith('/@vite') ||
          url.includes('.js') ||
          url.includes('.css') ||
          url.includes('.map') ||
          url.includes('@react-refresh')
        ) {
          console.log('[→ Vite asset]', url)
          return next()
        }

        console.log('[→ Frontend SPA]', url)
        return next()
      })
    }
  }
}
