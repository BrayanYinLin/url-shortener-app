/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { viteProxy } from './plugins/viteProxy'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5373',
        changeOrigin: true
      }
    }
  },
  plugins: [react(), tailwindcss(), viteProxy()],
  resolve: {
    alias: {
      '@': '/src/shared/',
      '@providers': '/src/app/providers/',
      '@pages': '/src/pages/',
      '@auth': '/src/modules/auth/',
      modules: '/src/modules/',
      root: '/src/'
    }
  }
})
