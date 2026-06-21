import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const base = process.env.DEMO_BASE ?? 'http://localhost:5173'
const outDir = 'wave5b-screenshots'
mkdirSync(outDir, { recursive: true })

async function capture(page, name) {
  const path = join(outDir, name)
  await page.screenshot({ path })
  console.log('saved', path)
}

async function openNorthgateListening(page) {
  await page.goto(`${base}/services/prototype-development#northgate-legal`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(800)
  await page.locator('#northgate-legal button').first().click()
  await page.waitForTimeout(900)
  const journey = page.getByText('Client listening review')
  if (await journey.count()) await journey.click()
  await page.waitForTimeout(800)
}

async function openPhoenixBreakdown(page) {
  await page.goto(`${base}/services/prototype-development#phoenix-coffee`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(800)
  await page.locator('#phoenix-coffee button').first().click()
  await page.waitForTimeout(900)
  const journey = page.getByText(/Machine breakdown|Store manager/i).first()
  if (await journey.count()) await journey.click()
  await page.waitForTimeout(800)
}

const browser = await chromium.launch()
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })

// Northgate — hero transformation
await openNorthgateListening(desktop)
await desktop.getByRole('button', { name: 'Consulting Firm' }).click()
await pageWait(desktop, 300)
await desktop.getByRole('button', { name: 'Client sponsor interview' }).click()
await capture(desktop, 'northgate-01-input-consulting-desktop.png')
await desktop.getByRole('button', { name: 'Analyse feedback' }).click()
await pageWait(desktop, 5000)
await capture(desktop, 'northgate-02-analysis-explorer-desktop.png')
await desktop.getByRole('button', { name: 'View executive insight' }).click()
await pageWait(desktop, 800)
await capture(desktop, 'northgate-03-hero-transformation-desktop.png')

// Northgate mobile hero
await openNorthgateListening(mobile)
await mobile.getByRole('button', { name: 'Analyse feedback' }).click()
await pageWait(mobile, 5000)
await mobile.getByRole('button', { name: 'View executive insight' }).click()
await pageWait(mobile, 800)
await capture(mobile, 'northgate-04-hero-transformation-mobile.png')

// Phoenix — weak coffee diagnosis
await desktop.goto(`${base}/services/prototype-development#phoenix-coffee`, {
  waitUntil: 'networkidle',
})
await pageWait(desktop, 800)
await desktop.locator('#phoenix-coffee button').first().click()
await pageWait(desktop, 900)
await desktop.getByText('Machine breakdown').click()
await pageWait(desktop, 800)
await desktop.getByRole('button', { name: /Weak coffee/i }).click()
await desktop.getByRole('button', { name: 'Run AI diagnosis' }).click()
await pageWait(desktop, 3500)
await capture(desktop, 'phoenix-01-weak-coffee-diagnosis-desktop.png')
await desktop.getByRole('button', { name: 'View recommended actions' }).click()
await pageWait(desktop, 600)
await desktop.locator('button').filter({ hasText: /Adjust grind|Deep clean/ }).first().click()
await pageWait(desktop, 600)
await capture(desktop, 'phoenix-02-business-impact-desktop.png')

// Phoenix mobile
await mobile.goto(`${base}/services/prototype-development#phoenix-coffee`, {
  waitUntil: 'networkidle',
})
await pageWait(mobile, 800)
await mobile.locator('#phoenix-coffee button').first().click()
await pageWait(mobile, 900)
await mobile.getByText('Machine breakdown').click()
await pageWait(mobile, 800)
await mobile.getByRole('button', { name: /Temperature unstable/i }).click()
await mobile.getByRole('button', { name: 'Run AI diagnosis' }).click()
await pageWait(mobile, 3500)
await capture(mobile, 'phoenix-03-temperature-diagnosis-mobile.png')

await browser.close()
console.log('Wave 5B screenshots complete')

function pageWait(page, ms) {
  return page.waitForTimeout(ms)
}
