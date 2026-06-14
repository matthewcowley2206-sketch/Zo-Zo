import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const buildTimeJsonLd = JSON.parse(
  readFileSync(path.join(rootDir, 'scripts/buildTimeJsonLd.json'), 'utf8'),
) as Record<string, unknown>

function injectBuildTimeSeo() {
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(buildTimeJsonLd)}</script>`

  return {
    name: 'inject-build-time-seo',
    transformIndexHtml(html: string) {
      return html.replace('</head>', `    ${jsonLdScript}\n  </head>`)
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Zo-Zo/' : '/',
  plugins: [react(), tailwindcss(), injectBuildTimeSeo()],
})
