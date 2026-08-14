import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Multi-page site: unknown paths 404 in dev/preview, matching S3.
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        'bharat-fund': fileURLToPath(new URL('./bharat-fund.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        philosophy: fileURLToPath(new URL('./philosophy.html', import.meta.url)),
        research: fileURLToPath(new URL('./research.html', import.meta.url)),
        team: fileURLToPath(new URL('./team.html', import.meta.url)),
      },
    },
  },
})
