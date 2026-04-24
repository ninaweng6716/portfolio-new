import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { writeFileSync, mkdirSync } from 'fs'

import { cloudflare } from "@cloudflare/vite-plugin";

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      mkdirSync('dist', { recursive: true })

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ninaweng.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`
      writeFileSync('dist/sitemap.xml', sitemap)
    }
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), svgr(), sitemapPlugin(), cloudflare()],
  build: {
    cssCodeSplit: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})