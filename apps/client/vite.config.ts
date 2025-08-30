/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

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
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src/shared/',
      modules: '/src/modules/',
      root: '/src/'
    }
  }
})
