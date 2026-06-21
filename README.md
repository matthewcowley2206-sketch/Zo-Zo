# Zo&Zo Advisory Website

A modern, Apple-inspired marketing site for [Zo&Zo Advisory](https://www.zoandzo.com.au).

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/how-we-work` | How we engage - understand your business, recommend services |
| `/services` | Services hub (Prototype Development listed first) |
| `/services/:slug` | Full service detail (comprehensive layout for every service) |
| `/services/prototype-development` | Prototype Development + interactive demo showcase |
| `/work` | Redirects to `/services/prototype-development#demos` |
| `/about` | About Zo&Zo Advisory |
| `/contact` | Contact form + details |

## Live site (GitHub Pages)

After deployment, the public site is here:

**https://matthewcowley2206-sketch.github.io/Zo-Zo/**

This is the live version anyone can open in a browser. It is not `localhost`.

In the repo, go to **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** (not the `gh-pages` branch). The workflow in `.github/workflows/deploy-pages.yml` runs on every push to `main`.

## Local development

Run the site on your own computer while you are building or testing:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

`localhost:5173` only works on the machine where the dev server is running. It is not the GitHub link.

## Contact form

Submissions are emailed via [FormSubmit](https://formsubmit.co) to **matt@zoandzo.com.au**, with a copy to the CC address in `src/content/site.ts`.

## Pause the live site (Vercel maintenance mode)

On **www.zoandzo.com.au** (Vercel), you can show a “Temporarily unavailable” page without touching GoDaddy DNS.

### Turn maintenance mode ON

1. Vercel → project **zo-zo-advisory** → **Settings → Environment Variables**
2. Add:
   - **Name:** `VITE_MAINTENANCE_MODE`
   - **Value:** `true`
   - **Environment:** Production only
3. **Save**, then **Deployments** → **Redeploy** the latest production build

### Turn maintenance mode OFF

1. Delete `VITE_MAINTENANCE_MODE`, or set it to `false`
2. **Redeploy** production

The full site returns on the next deploy. GitHub Pages (`github.io/Zo-Zo`) is separate and is not affected by this setting.

## SEO & AI discoverability

The site includes:

- **Per-page titles, descriptions, Open Graph, and Twitter cards** (via client-side meta on route change)
- **JSON-LD structured data** - Organization, WebSite, WebPage, Service, FAQ, and Breadcrumb schemas
- **`/sitemap.xml`** - auto-generated on each build (canonical domain: www.zoandzo.com.au)
- **`/robots.txt`** - allows search and AI crawlers
- **`/llms.txt`** - plain-language summary for AI answer engines
- **Build-time Organization schema** baked into `index.html`

### After deploy - recommended next steps

1. **Google Search Console** - add `https://www.zoandzo.com.au` and submit `https://www.zoandzo.com.au/sitemap.xml`
2. **Bing Webmaster Tools** - same sitemap URL
3. Keep **LinkedIn / directory listings** aligned with the site description for entity consistency
