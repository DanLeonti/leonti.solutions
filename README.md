# leonti.solutions

Company site for **Leonti Solutions** — a technology consultancy covering solutions
engineering, AI &amp; automation, product engineering, and compliance-grade data work.

Live: https://leonti.solutions

## Stack

- Static HTML/CSS/JS (single page, no build step)
- Cloudflare Workers with static assets for hosting
- A small Worker route (`/api/sp500`) proxies the S&amp;P 500 quote server-side

## Live market ticker

The hero ticker shows S&amp;P 500, BTC and ETH.

- **BTC / ETH** are fetched client-side from the CoinGecko public API. CoinGecko
  blocks Cloudflare datacenter IPs, so these must not be moved server-side.
- **S&amp;P 500** is fetched by the Worker from Yahoo Finance and served from
  `/api/sp500` with a 60s cache, because Yahoo sends no CORS headers.

## Local development

```bash
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

## Layout

```
public/index.html   the site
src/index.js        Worker: /api/sp500 + static asset passthrough
wrangler.jsonc      Cloudflare config, custom domains
```
