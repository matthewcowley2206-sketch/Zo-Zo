import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const base = process.env.DEMO_BASE ?? 'http://localhost:5173'
const outDir = 'phase5a-screenshots'
mkdirSync(outDir, { recursive: true })

async function capture(page, name) {
  const path = join(outDir, name)
  await page.screenshot({ path })
  console.log('saved', path)
}

async function openDemo(page, demoId) {
  await page.goto(`${base}/services/prototype-development#${demoId}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.locator(`#${demoId} button`).first().click()
  await page.waitForTimeout(900)
  const journey = page.getByRole('button').filter({ hasText: /Store manager|Client insights/i }).first()
  if (await journey.count()) await journey.click()
  await page.waitForTimeout(800)
}

const browser = await chromium.launch()
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })

await openDemo(mobile, 'phoenix-coffee')
await capture(mobile, 'phoenix-01-symptom-input-mobile.png')
await mobile.getByRole('button', { name: 'Run AI diagnosis' }).click()
await mobile.waitForTimeout(3500)
await capture(mobile, 'phoenix-02-diagnosis-preview-mobile.png')
await mobile.getByRole('button', { name: 'View recommended actions' }).click()
await mobile.waitForTimeout(600)
await capture(mobile, 'phoenix-03-actions-mobile.png')

await openDemo(desktop, 'northgate-legal')
await capture(desktop, 'northgate-01-feedback-input-desktop.png')
await desktop.getByRole('button', { name: 'Analyse feedback' }).click()
await desktop.waitForTimeout(4500)
await capture(desktop, 'northgate-02-top-insight-desktop.png')
await desktop.getByRole('button', { name: 'Generate executive brief' }).click()
await desktop.waitForTimeout(600)
await capture(desktop, 'northgate-03-executive-brief-desktop.png')

await browser.close()
console.log('Phase 5A screenshots complete')
