# James Notley — portfolio site

A Markdown-driven build of the portfolio site from the Notley Design System.

```
content/        ← EDIT THIS. Markdown: site.md, about.md, projects/*/…   (see content/README.md)
src/            the four React screens; read window.SITE_DATA, no content baked in
build/build.js  Node build — content/ + design-system/ + vendor/  →  portfolio_site/
vendor/         pinned build-time libs (Babel, marked, js-yaml) + React runtime
design-system/  the original Notley Design System export, untouched (tokens, _ds_bundle.js, components)
portfolio_site/ ← DEPLOY THIS. Generated, self-contained static site.
```

## Workflow

1. Edit files in `content/` — see [`content/README.md`](content/README.md).
2. `node build/build.js`
3. Reload / redeploy `portfolio_site/`.

Requires Node (any recent version). No npm install — everything the build needs is
vendored in `vendor/`. To preview: `cd portfolio_site && python3 -m http.server 8000`.

## What changed from the plain implementation

The site content used to live in a hand-written `data.js` and in strings hard-coded
inside the screens. It now comes entirely from `content/*.md`, compiled to
`portfolio_site/assets/content.js` at build time. The screens were rewired to read
`window.SITE_DATA`; the design-system CSS and component bundle are unchanged.
