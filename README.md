# James Notley — portfolio site

A Markdown-driven build of the portfolio site from the Notley Design System.

```
content/        ← EDIT THIS. Markdown: site.md, about.md, projects/*/…   (see content/README.md)
src/            App.jsx + the three screens (read window.SITE_DATA); overrides.css
build/build.js  Node build — content/ + design-system/ + vendor/  →  portfolio_site/
vendor/         pinned build-time libs (Babel, marked, js-yaml) + React runtime
design-system/  the original Notley Design System export, untouched (tokens, _ds_bundle.js, components)
portfolio_site/ ← DEPLOYED. Generated, self-contained static site.
```

Held over from the previous raptor8134.github.io — `img/`, `woodward.html`,
`soy.py`, `googledd63943926a8d8fc.html`, `seniordesignposter.pdf`. Kept for
reuse; the build ignores them wherever they sit (a directory under
`content/projects/` only counts as a project if it has a `card.md`).

## Workflow

    node build/watch.js          # dev server + live reload on http://localhost:4321

Edit anything under `content/` (or `src/`) and the open page refreshes itself —
no rebuild by hand. See [`content/README.md`](content/README.md) for the content
format. Ctrl-C to stop.

One-off build without the server: `node build/build.js`, then serve the folder
with e.g. `cd portfolio_site && python3 -m http.server 8000`.

Requires Node (any recent version). No npm install — everything is vendored in
`vendor/`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` runs `node build/build.js` on every push to `main`
and publishes `portfolio_site/` to the custom domain in `CNAME` (`jamesnotley.com`).
One-time setup:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually). The
   run's `deploy` job prints the live URL.

The committed `portfolio_site/` is just a convenience for local/other hosts — CI
always rebuilds from source, so it doesn't matter if it's stale.

The build writes three files into `portfolio_site/` that aren't derived from
`content/`:

- `.nojekyll` — stops Pages running the output through Jekyll.
- `CNAME` — copied from the repo root so the custom domain survives each deploy
  (the artifact is the whole site; a root `CNAME` alone would never be served).
- *(no `README.md`)* — deliberately not shipped, so it can't stand in as the
  homepage. A root `.nojekyll` is also committed as a backstop in case Pages is
  ever switched back to "deploy from a branch".

Runtime note: React is vendored, but Lucide icons and the webfonts load from CDNs
(unpkg, Google Fonts) at view time.

## Routing — one clean URL per project

The build emits a real page per project: `portfolio_site/<project-id>/index.html`,
served at `jamesnotley.com/<project-id>/` (the `<project-id>` is `id:` in that
project's `card.md`). Each page boots the same bundle with an injected
`window.__ROUTE__` so it opens straight to that project. In-app navigation keeps
the URL in sync with `history.pushState`; Back/Forward and direct links all work.
`build/build.js` also writes `404.html`, `sitemap.xml` and `robots.txt`.

Because pages live at more than one depth, every in-site URL the build emits is
root-absolute (`/assets/...`) — including image paths in `assets/content.js`. If
you reference a file from `content/site.md`, write it as `/assets/whatever`.

## Local CSS

`src/overrides.css` is appended to the design-system token bundle by the build.
It currently does two things:

- Flips the light/dark palette in one step. `App.jsx` briefly sets
  `[data-theme-animating]` on `<html>` and the rule kills control transitions for
  those two frames, so the swap doesn't animate as a staggered wipe.
- **Temporary:** flattens the green→blue accent gradient to solid spring-green
  everywhere except the header style switch. Delete that `:root` / `.style-switch`
  block (keep the file) to restore the gradient.

## What changed from the plain implementation

The site content used to live in a hand-written `data.js` and in strings hard-coded
inside the screens. It now comes entirely from `content/*.md`, compiled to
`portfolio_site/assets/content.js` at build time. The screens were rewired to read
`window.SITE_DATA`; the design-system CSS and component bundle are unchanged.
