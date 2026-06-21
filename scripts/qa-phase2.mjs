import { chromium } from 'playwright'

const base = 'http://localhost:5173'

const routes = [
  { path: '/services', expect: 'Start with the problem' },
  { path: '/pricing', expect: 'Simple starting points' },
  { path: '/how-we-work', expect: 'We start by understanding' },
  { path: '/services/client-listening', expect: 'Client Listening' },
  { path: '/services/prototype-development', expect: 'Test Before You Invest' },
  { path: '/services/growth-gtm', expect: 'Growth & Go-to-Market' },
  { path: '/services/communication', expect: 'Communication & Clarity' },
  { path: '/services/operations', expect: 'Operations & Simplification' },
  { path: '/services/data-ai', expect: 'Data, AI & Insights' },
]

const redirects = [
  { from: '/services/sales-marketing', to: '/services/growth-gtm' },
  { from: '/services/go-to-market', to: '/services/growth-gtm' },
]

const legacyNames = ['Sales & Marketing', 'Go-to-Market', 'Prototype Development']

const results = []

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const route of routes) {
  const response = await page.goto(`${base}${route.path}`, { waitUntil: 'networkidle' })
  const url = page.url().replace(base, '')
  const body = await page.textContent('body')
  const ok =
    response?.ok() &&
    url.replace(/\/$/, '') === route.path &&
    body?.includes(route.expect)
  results.push({ type: 'route', ...route, ok, finalUrl: url })
}

for (const redirect of redirects) {
  await page.goto(`${base}${redirect.from}`, { waitUntil: 'networkidle' })
  const url = page.url().replace(base, '').replace(/\/$/, '')
  const expected = redirect.to.replace(/\/$/, '')
  const body = await page.textContent('body')
  const ok = url === expected && body?.includes('Growth & Go-to-Market')
  results.push({ type: 'redirect', ...redirect, ok, finalUrl: url })
}

await page.goto(`${base}/pricing`, { waitUntil: 'networkidle' })
const pricingText = (await page.textContent('body')) ?? ''
const pricingLegacy = legacyNames.filter((name) => pricingText.includes(name))
results.push({
  type: 'pricing-legacy',
  ok: pricingLegacy.length === 0,
  found: pricingLegacy,
})

const themeLabels = [
  'Opportunity & Insight',
  'Strategy & Structure',
  'Prototype & AI Advisory',
  'Growth & Go-to-Market',
  'Test Before You Invest',
]
const pricingThemes = themeLabels.filter((label) => pricingText.includes(label))
results.push({
  type: 'pricing-themes',
  ok: pricingThemes.length >= 4,
  found: pricingThemes,
})

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(`${base}/services`, { waitUntil: 'networkidle' })
await mobile.screenshot({ path: 'phase2-screenshots/qa-mobile-services.png', fullPage: true })
await mobile.goto(`${base}/pricing`, { waitUntil: 'networkidle' })
await mobile.screenshot({ path: 'phase2-screenshots/qa-mobile-pricing.png', fullPage: true })

await browser.close()

const failed = results.filter((r) => r.ok === false)
console.log(JSON.stringify({ passed: failed.length === 0, results, failed }, null, 2))
process.exit(failed.length === 0 ? 0 : 1)
