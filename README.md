# Asankhya Capital — Website

The official website for **Asankhya Capital** — a seven-page marketing site: homepage,
About, Investment Philosophy, Bharat Fund, Research & Insights, Team, and Contact.
Every page is an exact implementation of the approved wireframe set.

**Live:** https://asankhyacapital.com

---

## Tech & hosting

**React 19 + Vite + TypeScript** multi-page app (one Vite entry per page) with
hand-written CSS (design tokens + CSS Modules — no Tailwind, no CSS-in-JS).
System fonts only (Georgia + Arial). **Zero third-party requests** at runtime.

Deployed on **Vercel**: pushes to `main` auto-build (`npm run build` → `dist/`).
[vercel.json](vercel.json) enables **clean URLs** (`/about` serves `about.html`;
`.html` URLs 308-redirect to the extensionless form), disables trailing slashes,
and stamps immutable cache headers on hashed `/assets/*`. The custom domain is
attached in the Vercel dashboard under Domains.

<details>
<summary>Alternative hosting: AWS S3 + CloudFront (retained as fallback)</summary>

The original pipeline (S3 `ap-south-1` + CloudFront + Route 53) still works:

- [DEPLOY.md](DEPLOY.md) — one-time AWS setup runbook
- [deploy.ps1](deploy.ps1) — build + S3 sync + CloudFront invalidation
- [setup-clean-urls.ps1](setup-clean-urls.ps1) + [infra/clean-urls-function.js](infra/clean-urls-function.js)
  — one-time CloudFront Function giving the same clean-URL behavior as vercel.json

</details>

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

Clean URLs work in dev and preview out of the box (Vite resolves `/about` →
`about.html` natively).

---

## Project structure

```
.
├── index.html                  # homepage entry (per-page SEO/OG meta lives in each entry)
├── about.html  philosophy.html  bharat-fund.html
├── research.html  team.html  contact.html      # one Vite MPA entry per page
├── vercel.json                 # clean URLs, trailing-slash policy, asset caching
├── public/                     # copied to dist/ verbatim
│   ├── 404.html                # standalone branded not-found page
│   ├── favicon.svg  og-image.svg
│   ├── robots.txt   sitemap.xml
├── src/
│   ├── main.tsx  App.tsx       # homepage (+ deep-link hash scroll)
│   ├── <page>.tsx + <Page>App.tsx   # entry + composition per page
│   ├── components/             # shared: Nav (active state), Footer, Logo, PageHero,
│   │                           #   FactTable, Reveal, ScrollReveal
│   │                           # homepage: Hero, Philosophy, Rivers, Pillars,
│   │                           #   FundTeaser, Insights, TrustStrip, Cta
│   │                           # page sections: TeamGrid, AboutStory, Commitment,
│   │                           #   FundStructure, FundGovernance, SangamRivers,
│   │                           #   PhilosophyPillars, ReadNext, ResearchGrid,
│   │                           #   SubscribeBand, ContactForm, ContactStrip, MeetTeam
│   ├── hooks/                  # useInView, usePrefersReducedMotion
│   └── styles/
│       ├── tokens.css          # the design system: navy/gold palette, type, spacing
│       └── global.css          # reset, utilities, reveal systems, reduced motion
├── deploy.ps1  setup-clean-urls.ps1  infra/    # AWS fallback tooling
└── DEPLOY.md                   # AWS runbook (fallback path)
```

---

## Editing the site

- **Section copy** — each section's text lives as typed const arrays in its component
  (e.g. [src/components/TeamGrid.tsx](src/components/TeamGrid.tsx))
- **Colors / type scale / spacing** — [src/styles/tokens.css](src/styles/tokens.css)
- **SEO / social meta** — per page, in its root entry HTML (e.g. [about.html](about.html))
- **Adding a page** — new `<page>.html` + `src/<page>.tsx` entry + `<Page>App.tsx`,
  register the entry in [vite.config.ts](vite.config.ts), add it to the sitemap,
  and link it from Nav/Footer
- **Motion** — hero/pagehero entrances use `Reveal`; below-fold sections use
  `ScrollReveal` + the `[data-sr]` transition system in global.css

All motion respects `prefers-reduced-motion`. Forms (contact qualification,
research-note subscribe) open a pre-filled email draft to info@asankhyacapital.com —
no backend; swap the submit handlers when a form endpoint exists.

---

## Deploying an update

Push to `main` — Vercel builds and deploys automatically. Verify after deploy:

```
/about            → 200 (page, no extension in the URL)
/about.html       → 308 → /about
/nonexistent      → branded 404 page
```

---

## Roadmap
- [x] Replace the coming-soon page with the full homepage
- [x] Build the standalone pages (About, Philosophy, Bharat Fund, Insights, Team, Contact)
- [ ] SCALE Framework page (nav + footer links currently fall back to the homepage
  pillars section)
- [ ] Wire the contact + subscribe forms to a real endpoint (currently mailto drafts)
- [ ] Export `og-image.svg` → PNG for broadest social-preview compatibility
