import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // change to your preferred port number
    host: '0.0.0.0',  // change host (0.0.0.0 allows external access)
  },
})
