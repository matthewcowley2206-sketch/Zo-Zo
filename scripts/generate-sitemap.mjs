import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://www.zoandzo.com.au'
const lastmod = new Date().toISOString().slice(0, 10)

const serviceSlugs = [
  'prototype-development',
  'strategy',
  'client-listening',
  'sales-marketing',
  'communication',
  'data-ai',
  'operations',
  'go-to-market',
]

const paths = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/how-we-work', priority: '0.8', changefreq: 'monthly' },
  { loc: '/services', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/prototype-development', priority: '0.95', changefreq: 'weekly' },
  ...serviceSlugs
    .filter((slug) => slug !== 'prototype-development')
    .map((slug) => ({
      loc: `/services/${slug}`,
      priority: '0.85',
      changefreq: 'monthly',
    })),
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/pricing', priority: '0.75', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
]

const urlEntries = paths
  .map(
    ({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${loc === '/' ? '' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')
console.log(`Generated sitemap with ${paths.length} URLs`)
