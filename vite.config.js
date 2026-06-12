import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page: the main site + a standalone gallery page (/gallery.html).
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
      },
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
