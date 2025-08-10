/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src/shared/',
      modules: '/src/modules/',
      root: '/src/'
    }
  },
  test: {
    environment: 'happy-dom'
  }
})
