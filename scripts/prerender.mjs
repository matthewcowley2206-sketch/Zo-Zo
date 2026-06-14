import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(rootDir, 'dist')
const base = process.env.GITHUB_ACTIONS === 'true' ? '/Zo-Zo/' : '/'
const previewPort = 4173

const routes = [
  '/',
  '/how-we-work',
  '/services',
  '/services/prototype-development',
  '/services/strategy',
  '/services/client-listening',
  '/services/sales-marketing',
  '/services/communication',
  '/services/data-ai',
  '/services/operations',
  '/services/go-to-market',
  '/about',
  '/contact',
]

function routeToOutputPath(route) {
  if (route === '/') return join(distDir, 'index.html')

  const normalized = route.replace(/^\//, '')
  return join(distDir, normalized, 'index.html')
}

function prefixBase(route) {
  if (base === '/') return route
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base
  return route === '/' ? `${trimmed}/` : `${trimmed}${route}`
}

async function waitForServer(origin) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch(`${origin}/`)
      if (response.ok) return
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Preview server did not respond at ${origin}`)
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['./node_modules/vite/bin/vite.js', 'preview', '--port', String(previewPort), '--strictPort'],
      {
        cwd: rootDir,
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )

    let output = ''
    const onData = (chunk) => {
      output += chunk.toString()
    }

    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code && code !== 0) {
        reject(new Error(`Preview server exited with code ${code}\n${output}`))
      }
    })

    setTimeout(async () => {
      try {
        await waitForServer(`http://localhost:${previewPort}`)
        resolve(child)
      } catch (error) {
        child.kill('SIGTERM')
        reject(error)
      }
    }, 1500)
  })
}

async function prerender() {
  if (process.env.SKIP_PRERENDER === 'true' || process.env.CI === 'true') {
    console.log('Skipping prerender (CI or SKIP_PRERENDER=true)')
    return
  }

  const previewProcess = await startPreviewServer()
  const origin = `http://localhost:${previewPort}`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    for (const route of routes) {
      const page = await browser.newPage()
      const url = `${origin}${prefixBase(route)}`

      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60_000,
      })

      await page.waitForFunction(() => document.querySelector('main, h1'), {
        timeout: 15_000,
      })

      const html = await page.content()
      const outputPath = routeToOutputPath(route)

      mkdirSync(dirname(outputPath), { recursive: true })
      writeFileSync(outputPath, html, 'utf8')
      console.log(`Prerendered ${route} -> ${outputPath.replace(rootDir, '.')}`)
      await page.close()
    }
  } finally {
    await browser.close()
    previewProcess.kill('SIGTERM')
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
