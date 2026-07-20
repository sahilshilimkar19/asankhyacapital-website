# Asankhya Capital — Website

The official website for **Asankhya Capital**. This repository currently hosts the
**"Coming Soon"** landing page while the full site is being built.

**Live:** https://asankhyacapital.com

---

## Tech & hosting

**React 19 + Vite + TypeScript** single-page app with hand-written CSS (design tokens +
CSS Modules — no Tailwind, no CSS-in-JS). Self-hosted Fraunces variable font.
**Zero third-party requests** at runtime.

| Layer | Service |
|-------|---------|
| Storage | Amazon S3 (private bucket, `ap-south-1`) |
| CDN + HTTPS | Amazon CloudFront (TLS via ACM certificate) |
| DNS | Amazon Route 53 (domain registered at GoDaddy) |

Full setup and deployment steps are in **[DEPLOY.md](DEPLOY.md)**.

---

## Development

Requires Node.js ≥ 20.19.

```powershell
npm ci            # install dependencies
npm run dev       # dev server with HMR → http://localhost:5173
npm run build     # typecheck + production build → dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

---

## Project structure

```
.
├── index.html                  # entry — all SEO/OG meta lives here
├── public/                     # copied to dist/ verbatim
│   ├── 404.html                # standalone branded not-found page (served by CloudFront)
│   ├── favicon.svg  og-image.svg
│   ├── robots.txt   sitemap.xml
│   └── fonts/                  # self-hosted Fraunces variable font (woff2)
├── src/
│   ├── main.tsx  App.tsx       # composition + cursor-parallax wiring
│   ├── components/             # Reveal, AmbientBackground, Hero, Cta, Footer
│   ├── hooks/                  # useCursorParallax, usePrefersReducedMotion
│   └── styles/
│       ├── tokens.css          # the design system: colors, type scale, spacing, motion
│       └── global.css          # reset, @font-face, keyframes, reveal system
├── deploy.ps1                  # build + S3 sync + CloudFront invalidation
└── DEPLOY.md                   # one-time AWS setup runbook
```

---

## Editing the page

- **Copy** (tagline, description, status) — [src/components/Hero.tsx](src/components/Hero.tsx)
- **Contact email** — [src/components/Cta.tsx](src/components/Cta.tsx) and
  [src/components/Footer.tsx](src/components/Footer.tsx)
- **Colors / type scale / spacing** — [src/styles/tokens.css](src/styles/tokens.css)
- **SEO / social meta** — [index.html](index.html)
- **Entrance choreography** — reveal indices in the components; timing tokens
  (`--dur-reveal`, `--reveal-base`, `--reveal-step`) in tokens.css

All motion respects `prefers-reduced-motion`. Cursor parallax activates only on
fine-pointer (desktop) devices.

---

## Deploying an update

After the one-time AWS setup (see [DEPLOY.md](DEPLOY.md)):

```powershell
./deploy.ps1 -Bucket <your-bucket-name> -DistributionId <your-distribution-id>
```

Builds, syncs `dist/` to S3 with tiered cache headers, and invalidates CloudFront.

---

## Roadmap
- [ ] Point the domain and go live (see DEPLOY.md)
- [ ] Export `og-image.svg` → PNG for broadest social-preview compatibility
- [ ] Replace the coming-soon page with the full site when ready
