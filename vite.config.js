import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es']
        }
      }
    },
    commonjsOptions: {
      include: [/lodash-es/, /node_modules/]
    }
  },
  optimizeDeps: {
    include: ['lodash-es']
  }
})
