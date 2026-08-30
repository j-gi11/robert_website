import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  // Served from the root now that robertrossrecording.com (see public/CNAME)
  // is attached — GitHub Pages custom domains serve at '/', not the
  // '/robert_website/' project-site subpath.
  base: '/',
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
