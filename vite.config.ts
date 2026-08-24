import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  // GitHub Pages project-site path. Only needed until a custom domain
  // (robertrossrecording.com) is attached, at which point this becomes '/'.
  base: '/robert_website/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      apply: 'build',
      closeBundle() {
        const distDir = join(process.cwd(), 'dist')
        const indexPath = join(distDir, 'index.html')
        const notFoundPath = join(distDir, '404.html')
        copyFileSync(indexPath, notFoundPath)
      },
    },
  ],
  server: {
    port: 5173,
    open: true,
  },
})
