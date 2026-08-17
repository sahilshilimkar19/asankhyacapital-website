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
│   ├── media/                  # hero video encodes + poster (see "Media assets")
│   └── team/                   # leadership portraits (see "Media assets")
├── src/
│   ├── main.tsx  App.tsx       # homepage (+ deep-link hash scroll)
│   ├── <page>.tsx + <Page>App.tsx   # entry + composition per page
│   ├── components/             # shared: Nav (active state), Footer, Logo, PageHero,
│   │                           #   FactTable, Reveal, ScrollReveal
│   │                           # homepage: Hero (video), Philosophy, Rivers,
│   │                           #   Pillars, FundTeaser, TrustStrip, Cta
│   │                           #   (Insights.tsx is retained but unmounted —
│   │                           #    re-add to App.tsx to restore the section)
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

## Media assets

### Hero video montage

The homepage hero ([src/components/Hero.tsx](src/components/Hero.tsx)) plays a montage:
one `<video>` per clip, stacked and **cross-dissolved** into each other in rotation.
Each slot keeps its own clip for the whole session, so nothing re-buffers after the
first pass.

Clips live in `public/media/` and are listed in one place:

```ts
const CLIPS = ['/media/mumbai-hero.mp4', '/media/NY-hero.mp4'] as const
```

Add, remove or reorder entries there — the dissolve machinery adapts. Two knobs sit
beside it:

| Constant | Purpose |
| --- | --- |
| `PLAYBACK_RATE` | `0.5`. The supplied clips are only 1.3–2.3 s; at full speed the montage stutters, at half speed it drifts. Raise toward `1` as clips get longer. |
| `MAX_FADE_MS` | Dissolve ceiling. The value actually used is `min(MAX_FADE_MS, shortestClip × 0.3)`, so a very short clip is never mostly-dissolve. |

**Clip specs.** ~8–12 s each, 1920×1080, H.264, **no audio track**, ≤4 MB. The current
clips are 1280×720 and very short — they work, but longer 1080p footage would let
`PLAYBACK_RATE` go back to `1` and remove the need for slow motion entirely. To
re-encode a master:

```powershell
ffmpeg -i master.mov -an -t 10 -vf "scale=1920:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart public/media/mumbai-hero.mp4
```

`-an` strips audio deliberately: the montage is decorative and autoplays muted, so a
silent file is smaller and avoids autoplay blocking.

**Degradation.** A clip that 404s is dropped from the rotation; with one clip left the
survivor hard-loops; with none the hero falls back to the navy gradient painted on
`.media`. Under `prefers-reduced-motion` nothing autoplays — the first clip renders as
a still frame, and the pause/play control in the foot strip can start it on request.

**Compositing note.** `.video` carries `transform: translateZ(0)`, and the hero uses no
`backdrop-filter`. Both matter: sharing a compositing layer with a blurred overlay made
Chrome repaint the footage only when something else invalidated the page — the video
appeared frozen until the pointer moved. Don't reintroduce `backdrop-filter` over the
clips.

### Team photographs

[src/components/TeamGrid.tsx](src/components/TeamGrid.tsx) holds one entry per seat.
Drop portraits in `public/team/` and fill in `name` + `photo` per entry:

```ts
{
  initials: 'CIO',
  title: 'Chief Investment Officer',
  name: 'Full Name',
  photo: '/team/full-name.jpg',
  blurb: '…',
}
```

Portraits are cropped to 4:5 — supply ~800×1000 JPEGs, face slightly above centre.
A seat with no `name` keeps the `[Name to be added]` placeholder and the initials
frame, so the roster can be filled in one person at a time.

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
- [x] Hero video montage (Mumbai + NY clips, cross-dissolved)
- [ ] Longer 1080p hero clips, so `PLAYBACK_RATE` can return to `1`
- [ ] Drop in the team portraits (see "Media assets")
- [ ] SCALE Framework page (the footer link currently falls back to the homepage
  pillars section)
- [ ] Decide the naming: the hero now says "Sangam philosophy and six pillars
  framework" while interior pages still say "SCALE framework"
- [ ] Wire the contact + subscribe forms to a real endpoint (currently mailto drafts)
- [ ] Export `og-image.svg` → PNG for broadest social-preview compatibility
