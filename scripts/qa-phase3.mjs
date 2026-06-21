import { chromium } from 'playwright'

const base = 'http://localhost:5173'

const routes = [
  { path: '/how-we-work', expect: 'Understand → Structure → Prototype → Decide' },
  { path: '/how-we-work', expect: 'Zo&Zo is not a software development agency' },
  { path: '/about', expect: 'Practical advisory for leaders' },
  { path: '/about', expect: 'Client Listening is often where clarity begins' },
  { path: '/work', expect: 'Proof of method' },
  { path: '/work', expect: 'Test Before You Invest' },
  { path: '/services', expect: 'Start with the problem' },
  { path: '/pricing', expect: 'Simple starting points' },
  { path: '/services/client-listening', expect: 'Client Listening' },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const checks = []
for (const route of routes) {
  await page.goto(`${base}${route.path}`, { waitUntil: 'networkidle' })
  const body = await page.textContent('body')
  checks.push({ ...route, ok: body?.includes(route.expect) ?? false })
}

await page.goto(`${base}/how-we-work`, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'phase3-screenshots/01-how-we-work-hero.png' })
await page.getByText('The Zo&Zo Method').scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await page.screenshot({ path: 'phase3-screenshots/02-how-we-work-method.png' })
await page.getByText('Example outputs from our work').scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await page.screenshot({ path: 'phase3-screenshots/03-how-we-work-outputs.png' })

await page.goto(`${base}/about`, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'phase3-screenshots/04-about.png' })

await page.goto(`${base}/work`, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'phase3-screenshots/05-work-hero.png' })
await page.getByText('Horizon Airways').first().scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await page.screenshot({ path: 'phase3-screenshots/06-work-example.png' })

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(`${base}/how-we-work`, { waitUntil: 'networkidle' })
await mobile.screenshot({ path: 'phase3-screenshots/07-mobile-how-we-work.png', fullPage: true })
await mobile.goto(`${base}/work`, { waitUntil: 'networkidle' })
await mobile.screenshot({ path: 'phase3-screenshots/08-mobile-work.png', fullPage: true })

await browser.close()

const failed = checks.filter((c) => !c.ok)
console.log(JSON.stringify({ passed: failed.length === 0, checks, failed }, null, 2))
process.exit(failed.length === 0 ? 0 : 1)
