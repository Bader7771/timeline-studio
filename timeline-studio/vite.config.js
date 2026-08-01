import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js is the intentional core of this single-screen experience.
    chunkSizeWarningLimit: 800,
  },
})
