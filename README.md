# Salman Umer — Portfolio, Blog & Jobs

Personal site for **Salman Umer**, Tech Recruiter & Business Development Specialist at Jazzari Software Solutions, Lahore.

Built with **Next.js (App Router, static export)** and deployed to **GitHub Pages** by GitHub Actions on every push to `main`.

Live: https://salmanumer86.github.io

## Sections

| URL | What it is | Content lives in |
| --- | --- | --- |
| `/` | Portfolio home page | `app/page.tsx` |
| `/blog/` | Articles on hiring and recruiting | `content/blog/*.mdx` |
| `/advice/` | Career advice for developers | `content/advice/*.mdx` |
| `/jobs/` | Job postings (with Google for Jobs schema) | `content/jobs/*.mdx` |
| `/feed.xml` | RSS feed of blog + advice | generated |
| `/sitemap.xml`, `/robots.txt` | SEO | generated |

## Publishing content

Every post is one Markdown file. Add the file, commit, push to `main` — the site rebuilds and deploys in about a minute.

### Article or advice piece

Create `content/blog/my-post.mdx` (or `content/advice/...`). The filename becomes the URL: `/blog/my-post/`.

```mdx
---
title: "How I screen React developers"
description: "One or two sentences. Shown on cards, in search results and social previews."
date: "2026-09-18"          # yyyy-mm-dd — controls ordering
updated: "2026-10-01"       # optional
tags: ["hiring", "react"]   # optional — drives the "Related" section
draft: true                 # true = visible in `npm run dev` only, never deployed
---

Write normal Markdown here. Headings (`##`) get anchor links automatically.

<Callout>
A highlighted aside. Use for a key takeaway or a call to action.
</Callout>

Internal links like [get in touch](/#contact) work as expected.
```

### Job posting

Create `content/jobs/react-developer-lahore.mdx`. See [`content/jobs/example-react-developer-lahore.mdx`](content/jobs/example-react-developer-lahore.mdx) for a complete, commented template.

Required fields beyond the article ones: `company`, `location` (`"City, Country"`), `remote`, `employmentType`, `stack`, `applyUrl`, `validThrough`.

- A posting is **Open** until `validThrough`, then automatically shows as **Closed**, moves to the bottom of the list, and drops out of the sitemap and Google for Jobs.
- `applyUrl` can be a `mailto:` link, a `https://` link, or a WhatsApp `https://wa.me/...` link.
- `salary` is optional but Google strongly prefers it for job rich results.

### Drafts

`draft: true` posts render locally (with a red **Draft** badge) so you can preview them, and are excluded from production builds, the sitemap and the RSS feed. Set `draft: false` — or delete the line — to publish.

The sample posts that shipped with the site are all drafts. Edit them, or delete them, before publishing.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits to `.mdx` files and components hot-reload.

`npm run build` produces the static site in `out/` — this is exactly what gets deployed.

## Deployment

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

One-time setup in the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Editing the home page

Copy for the portfolio sections (hero, about, services, timeline, testimonials) is in `app/page.tsx` as plain data arrays at the top of the file. Contact details and the canonical URL are in `lib/site.ts`. Styles are in `app/globals.css`.

## Contact

- Email: salmanumer.dev@gmail.com
- LinkedIn: https://www.linkedin.com/in/salmanumer
