import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { buildTimeJsonLd } from './src/content/buildTimeJsonLd'

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
