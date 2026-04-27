import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is /portfolio/ for GitHub Pages (repo name)
// For local dev, Vite ignores the base and serves from /
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
