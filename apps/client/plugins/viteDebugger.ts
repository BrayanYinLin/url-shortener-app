import { Plugin } from 'vite'

export function viteDebugger(): Plugin {
  return {
    name: 'vite-debugger',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        const hasExtension = /\.[a-zA-Z0-9]+$/.test(url)

        if (
          !hasExtension &&
          !url.startsWith('/@vite') &&
          !url.includes('@react-refresh')
        ) {
          console.log('[→ API]', req.url, '\n', {
            method: req.method,
            purpose: req.headers['purpose'],
            fetchMode: req.headers['sec-fetch-mode']
          })
        }

        if (url.startsWith('/api')) {
          return next()
        }

        if (
          url.startsWith('/@vite') ||
          url.includes('.js') ||
          url.includes('.css') ||
          url.includes('.map') ||
          url.includes('@react-refresh')
        ) {
          return next()
        }

        return next()
      })
    }
  }
}
