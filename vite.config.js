import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep the WebGL stack in its own chunk; it is lazy-loaded by the hero
        // so it never blocks first paint.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/three|@react-three/.test(id)) return 'three';
            if (id.includes('gsap')) return 'gsap';
          }
        },
      },
    },
  },
})
