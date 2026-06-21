import { chromium } from 'playwright'

const base = 'https://www.zoandzo.com.au'

const desktopChecks = [
  { path: '/how-we-work', expect: 'Good decisions need more than ideas' },
  { path: '/how-we-work', expect: 'Zo&Zo is not a software development agency' },
  { path: '/about', expect: 'Practical advisory for leaders' },
  { path: '/work', expect: 'Proof of method, not just prototypes' },
  { path: '/work', expect: 'Test Before You Invest' },
]

const browser = await chromium.launch()
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })

const results = []

for (const check of desktopChecks) {
  await desktop.goto(`${base}${check.path}`, { waitUntil: 'networkidle', timeout: 60000 })
  const body = (await desktop.textContent('body')) ?? ''
  results.push({ viewport: 'desktop', ...check, ok: body.includes(check.expect) })
}

for (const path of ['/how-we-work', '/about', '/work']) {
  await mobile.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 60000 })
  const body = (await mobile.textContent('body')) ?? ''
  results.push({
    viewport: 'mobile',
    path,
    expect: 'page renders with nav',
    ok: body.includes('Zo') && body.length > 500,
  })
}

const sitemapRes = await fetch(`${base}/sitemap.xml`)
const sitemap = await sitemapRes.text()
results.push({ type: 'sitemap-work', ok: sitemap.includes('/work') })
results.push({
  type: 'sitemap-retired',
  ok: !sitemap.includes('sales-marketing') && !sitemap.includes('/services/go-to-market'),
})

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(JSON.stringify({ passed: failed.length === 0, results, failed }, null, 2))
process.exit(failed.length === 0 ? 0 : 1)
