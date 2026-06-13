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
| `/about` | About Matthew + Zo&Zo |
| `/contact` | Contact form + details |

## Live site (GitHub Pages)

After deployment, the public site is here:

**https://matthewcowley2206-sketch.github.io/Zo-Zo/**

This is the live version anyone can open in a browser. It is not `localhost`.

In the repo, go to **Settings → Pages** and set **Branch** to `gh-pages` / `/ (root)` if the site is not live yet.

## Local development

Run the site on your own computer while you are building or testing:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

`localhost:5173` only works on the machine where the dev server is running. It is not the GitHub link.
