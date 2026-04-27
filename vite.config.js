import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// VITE_BASE_URL is set in GitHub Actions to '/repo-name/'
// Locally it defaults to '/' so npm run dev works without any changes
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/',
})
