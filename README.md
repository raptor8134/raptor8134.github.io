# James Notley — portfolio site

A Markdown-driven build of the portfolio site from the Notley Design System.

```
content/        ← EDIT THIS. Markdown: site.md, about.md, projects/*/…   (see content/README.md)
src/            the four React screens; read window.SITE_DATA, no content baked in
build/build.js  Node build — content/ + design-system/ + vendor/  →  portfolio_site/
vendor/         pinned build-time libs (Babel, marked, js-yaml) + React runtime
design-system/  the original Notley Design System export, untouched (tokens, _ds_bundle.js, components)
portfolio_site/ ← DEPLOYED. Generated, self-contained static site.

img/ · woodward.html · soy.py · googledd63943926a8d8fc.html · seniordesignposter.pdf
                held over from the previous raptor8134.github.io — not part of the
                build or the deploy; kept for reuse. Leave them be.
```

## Workflow

1. Edit files in `content/` — see [`content/README.md`](content/README.md).
2. `node build/build.js`
3. Reload / redeploy `portfolio_site/`.

Requires Node (any recent version). No npm install — everything the build needs is
vendored in `vendor/`. To preview: `cd portfolio_site && python3 -m http.server 8000`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` runs `node build/build.js` on every push to `main`
and publishes `portfolio_site/` to `https://raptor8134.github.io/`. One-time setup:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually). The
   run's `deploy` job prints the live URL.

The committed `portfolio_site/` is just a convenience for local/other hosts — CI
always rebuilds from source, so it doesn't matter if it's stale. `.nojekyll` (emitted
by the build) stops Pages running the output through Jekyll.

Runtime note: React is vendored, but Lucide icons and the webfonts load from CDNs
(unpkg, Google Fonts) at view time.

## What changed from the plain implementation

The site content used to live in a hand-written `data.js` and in strings hard-coded
inside the screens. It now comes entirely from `content/*.md`, compiled to
`portfolio_site/assets/content.js` at build time. The screens were rewired to read
`window.SITE_DATA`; the design-system CSS and component bundle are unchanged.
