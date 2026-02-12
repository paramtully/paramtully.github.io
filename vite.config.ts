import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  css: {
    devSourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
})
