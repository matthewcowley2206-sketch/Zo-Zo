import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('phase1-screenshots')
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const captures = [
  { name: '01-hero', selector: 'section.hero-offset' },
  { name: '02-tension-method', scrollY: 900 },
  { name: '03-client-listening', text: 'Flagship capability' },
  { name: '04-service-themes', text: 'Four ways we reduce uncertainty.' },
  { name: '05-prototype-proof', text: 'Proof, not promises' },
]

await page.screenshot({ path: path.join(outDir, '01-hero.png') })

for (const capture of captures.slice(1)) {
  if (capture.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), capture.scrollY)
    await page.waitForTimeout(500)
    await page.screenshot({ path: path.join(outDir, `${capture.name}.png`) })
    continue
  }

  const heading = page.getByText(capture.text, { exact: false }).first()
  await heading.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(outDir, `${capture.name}.png`) })
}

await page.screenshot({
  path: path.join(outDir, '06-full-page.png'),
  fullPage: true,
})

await browser.close()
console.log(`Saved screenshots to ${outDir}`)
