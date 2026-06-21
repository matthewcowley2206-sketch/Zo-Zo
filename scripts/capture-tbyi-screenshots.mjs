import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = 'http://localhost:5173'
mkdirSync('tbyi-screenshots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

await page.goto(`${base}/services`, { waitUntil: 'networkidle' })
await page.locator('#strategy-structure').scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await page.screenshot({ path: 'tbyi-screenshots/01-services-strategy-standard.png' })

await page.locator('#prototype-ai').scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await page.screenshot({ path: 'tbyi-screenshots/02-services-prototype-section.png' })

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.getByText('Four ways we reduce uncertainty').scrollIntoViewIfNeeded()
await page.locator('a').filter({ hasText: 'Prototype & AI Advisory' }).first().scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await page.screenshot({ path: 'tbyi-screenshots/03-home-prototype-theme-card.png' })

await page.goto(`${base}/pricing`, { waitUntil: 'networkidle' })
await page.getByText('Prototype & AI Advisory').scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await page.screenshot({ path: 'tbyi-screenshots/04-pricing-tbyi-row.png' })

await browser.close()
console.log('Screenshots saved to tbyi-screenshots/')
