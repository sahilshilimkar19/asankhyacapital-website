# Asankhya Capital — Website

The official website for **Asankhya Capital**. This repository currently hosts the
**"Coming Soon"** landing page while the full site is being built.

**Live:** https://asankhyacapital.com

---

## Tech & hosting

A single, self-contained static site — no framework, no build step, no external
network requests (fonts and assets are inlined/self-hosted) for maximum speed and reliability.

| Layer | Service |
|-------|---------|
| Storage | Amazon S3 (private bucket, `ap-south-1`) |
| CDN + HTTPS | Amazon CloudFront (TLS via ACM certificate) |
| DNS | Amazon Route 53 (domain registered at GoDaddy) |

Full setup and deployment steps are in **[DEPLOY.md](DEPLOY.md)**.

---

## Project structure

```
.
├── index.html          # the coming-soon page (inline CSS, system fonts)
├── 404.html            # branded not-found page
├── robots.txt          # crawl rules
├── sitemap.xml         # single-URL sitemap
├── assets/
│   └── img/
│       ├── favicon.svg     # gold "A" monogram
│       └── og-image.svg    # social-share preview (1200×630)
├── deploy.ps1          # push updates to AWS (S3 sync + CloudFront invalidation)
├── DEPLOY.md           # one-time AWS setup runbook
└── .gitignore
```

---

## Editing the page

All copy lives directly in [index.html](index.html). Common edits:

- **Tagline** — the `.tagline` line ("Boundless opportunity. Disciplined capital.")
- **Description** — the `.description` paragraph
- **Contact email** — search for `contact@asankhyacapital.com` (appears in the button, footer, and meta tags)
- **Colors** — the CSS custom properties in `:root` (e.g. `--gold`, `--bg-1`)

No build step. Open `index.html` in a browser to preview locally.

---

## Deploying an update

After the one-time AWS setup (see [DEPLOY.md](DEPLOY.md)), publish changes with:

```powershell
./deploy.ps1 -Bucket <your-bucket-name> -DistributionId <your-distribution-id>
```

This syncs the site to S3 and invalidates the CloudFront cache so changes go live immediately.

---

## Roadmap
- [ ] Point the domain and go live (see DEPLOY.md)
- [ ] Export `og-image.svg` → PNG for broadest social-preview compatibility
- [ ] Replace the full site when ready (this coming-soon page becomes the fallback)
