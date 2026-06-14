import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://www.zoandzo.com.au'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const routes = [
  {
    path: '/services/prototype-development',
    title: 'Prototype Development Services | Sydney & Australia · Zo&Zo Advisory',
    description:
      'Prototype development for apps, workflows, dashboards, and customer journeys. Zo&Zo Advisory builds clickable working prototypes in Sydney and across Australia so you can test ideas before full software development.',
    ogImage: `${SITE_URL}/images/prototype-development-hero.jpg`,
    noscript: `
      <article>
        <h1>Prototype Development Services</h1>
        <p>
          Zo&amp;Zo Advisory provides prototype development for growing businesses in Sydney and across Australia.
          We build clickable working prototypes for apps, customer journeys, dashboards, and workflows so you can
          test ideas before full software development.
        </p>
        <p>
          <a href="${SITE_URL}/services/prototype-development">View prototype development services</a>
        </p>
      </article>
    `.trim(),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Prototype Development',
          serviceType: 'Prototype Development',
          description:
            'Clickable working prototype development for apps, workflows, dashboards, and customer journeys.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'Zo&Zo Advisory',
            url: SITE_URL,
          },
          areaServed: { '@type': 'Country', name: 'Australia' },
          url: `${SITE_URL}/services/prototype-development`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: `${SITE_URL}/services`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Prototype Development',
              item: `${SITE_URL}/services/prototype-development`,
            },
          ],
        },
      ],
    },
  },
]

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function upsertMeta(html, attribute, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${escapedKey}"\\s+content="[\\s\\S]*?"\\s*/?>`,
    'i',
  )
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`

  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }

  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function upsertTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
}

function upsertCanonical(html, href) {
  if (/link rel="canonical"/i.test(html)) {
    return html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${href}" />`)
  }

  return html.replace('</head>', `    <link rel="canonical" href="${href}" />\n  </head>`)
}

function injectRouteJsonLd(html, jsonLd) {
  const script = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  return html.replace('</head>', `    ${script}\n  </head>`)
}

function injectNoscript(html, noscript) {
  return html.replace(
    '<div id="root"></div>',
    `<noscript>${noscript}</noscript>\n    <div id="root"></div>`,
  )
}

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')

for (const route of routes) {
  const canonical = `${SITE_URL}${route.path}`
  let html = baseHtml

  html = upsertTitle(html, route.title)
  html = upsertMeta(html, 'name', 'description', route.description)
  html = upsertMeta(html, 'property', 'og:title', route.title)
  html = upsertMeta(html, 'property', 'og:description', route.description)
  html = upsertMeta(html, 'property', 'og:url', canonical)
  html = upsertMeta(html, 'property', 'og:image', route.ogImage)
  html = upsertMeta(html, 'name', 'twitter:title', route.title)
  html = upsertMeta(html, 'name', 'twitter:description', route.description)
  html = upsertMeta(html, 'name', 'twitter:image', route.ogImage)
  html = upsertCanonical(html, canonical)
  html = injectRouteJsonLd(html, route.jsonLd)
  html = injectNoscript(html, route.noscript)

  const outDir = join(distDir, route.path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
}

console.log(`Generated static HTML for ${routes.length} SEO route(s)`)
