import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const base = process.env.DEMO_BASE ?? 'http://localhost:5173'
const outDir = 'wave5b-b2-screenshots'
mkdirSync(outDir, { recursive: true })

async function capture(page, name) {
  const path = join(outDir, name)
  await page.screenshot({ path, fullPage: false })
  console.log('saved', path)
}

async function openNorthgateListening(page) {
  await page.goto(`${base}/services/prototype-development#northgate-legal`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(800)
  await page.locator('#northgate-legal button').first().click()
  await page.waitForTimeout(900)
  const journey = page.getByRole('button', { name: /Client listening review/i })
  if (await journey.count()) await journey.click()
  await page.waitForTimeout(800)
}

async function runToDecisionSupport(page) {
  await page.getByRole('button', { name: 'Analyse feedback' }).click()
  await page.waitForTimeout(4500)
  await page.getByRole('button', { name: 'View executive insight' }).click()
  await page.waitForTimeout(800)
}

const browser = await chromium.launch()
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })

// Homepage flagship section
await desktop.goto(`${base}/`, { waitUntil: 'networkidle' })
await desktop.waitForTimeout(1000)
await desktop.locator('text=Client Listening Intelligence').first().scrollIntoViewIfNeeded()
await desktop.waitForTimeout(500)
await capture(desktop, '01-homepage-flagship-desktop.png')

// Input + industry selector
await openNorthgateListening(desktop)
await capture(desktop, '02-input-industry-law-desktop.png')

await desktop.getByRole('button', { name: 'Accounting Firm' }).click()
await pageWait(desktop, 400)
await desktop.getByRole('button', { name: 'Audit client interview' }).click()
await capture(desktop, '03-input-industry-accounting-desktop.png')

await desktop.getByRole('button', { name: 'Analyse feedback' }).click()
await pageWait(desktop, 4500)
await capture(desktop, '04-analysis-complete-desktop.png')

await desktop.getByRole('button', { name: 'View executive insight' }).click()
await pageWait(desktop, 800)
await capture(desktop, '05-hero-transformation-desktop.png')

// Mobile hero flow
await mobile.goto(`${base}/services/prototype-development#northgate-legal`, {
  waitUntil: 'networkidle',
})
await pageWait(mobile, 800)
const northgateStart = mobile.locator('#northgate-legal').getByRole('button').first()
await northgateStart.click()
await pageWait(mobile, 900)
const listeningJourney = mobile.getByText('Client listening review')
if (await listeningJourney.count()) {
  await listeningJourney.click()
  await pageWait(mobile, 800)
}
await capture(mobile, '06-input-industry-mobile.png')
await mobile.getByRole('button', { name: 'Analyse feedback' }).click()
await pageWait(mobile, 4500)
await mobile.getByRole('button', { name: 'View executive insight' }).click()
await pageWait(mobile, 800)
await capture(mobile, '07-hero-transformation-mobile.png')

await browser.close()
console.log('Wave 5B B2 design review screenshots complete')

function pageWait(page, ms) {
  return page.waitForTimeout(ms)
}
