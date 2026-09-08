# Editing site content

Everything on the site comes from the Markdown files in this folder. While
editing, run

    node build/watch.js

from the repo root and open http://localhost:4321 — every save rebuilds and the
page refreshes on its own. (`node build/build.js` does a one-off build.) Nothing
here needs JavaScript knowledge.

```
content/
  site.md                       header, hero, contact, footer  (frontmatter only)
  about.md                      the About section
  resume.pdf                    linked from the Resume / Download Resume buttons
  backdrop/                     hero background micrographs (every image here is used, sorted by name)
  projects/
    01-uhv-deposition/
      card.md                   the grid card: title, year, tags + one-sentence brief
      article.md                the case-study write-up (long-form Markdown)
      images/                   figures referenced from article.md
    02-filament-winder/
      card.md
      article.md
      images/
```

## Frontmatter

The block between the two `---` lines at the top of a file is *frontmatter* —
`key: value` settings. Body text (below the second `---`) is normal Markdown.
Keep the indentation as shown; it is significant.

## `site.md`

All in frontmatter. Common edits:

- `hero.headline` — one line of the headline per line. Wrap a phrase in `[[ ]]`
  to paint it spring-green: `[[all builder]]`.
- `hero.intro`, `contact.blurb` — plain sentences.
- `contact.email`, `contact.phone`, `contact.phoneHref` (digits only, e.g. `+19165214107`).
- `work.tabs` — the project filter tabs. `match` is checked as a substring of a
  project's `tags`, so `match: uhv` selects every project tagged `uhv`. "All" is
  added automatically; its count and each tab's count are computed for you.
- `footer.links` — `icon` is a Lucide name (`linkedin`, `github`, `mail`, …).
- `resume` / `hero.secondaryCta` — `href` points at a file in `assets/`
  (`resume.pdf` is copied there from `content/resume.pdf`).

The wordmark above the headline and in the footer is the design system's
`Logotype` and is not editable here.

## `about.md`

Frontmatter:

- `intro` — the large opening line.
- `experience` — list of `{ role, org, dates }`. **This is where job dates live.**
- `methods` — list of `{ tag, name }`; `tag` shows as a chip, `name` on hover.
- `education` — list of `{ institution, degree, grad }`. Put a ` — ` in `degree`
  to break it onto a second line.

Body: the prose paragraphs, plain Markdown, one blank line between them.

## Projects

Each project gets its own page at `jamesnotley.com/<id>/` (the `id` from
`card.md`). Keep `id` a lowercase-hyphenated slug — it's the public URL.

### Adding a project

1. Make a folder `content/projects/NN-slug/` — the `NN-` number sets the order
   projects appear in the grid and the "More work" list. A folder without a
   `card.md` is ignored, so `content/projects/img/` etc. is fine to keep here.
2. Add `card.md` and (optionally) `article.md`. Copy an existing pair as a start.
3. Put any figures in that folder's `images/`.
4. Rebuild.

### Draft / unlisted projects

Put `draft: true` in `card.md`. The page still builds and is reachable at its
URL (`jamesnotley.com/<id>/`) so you can preview it, but it's left out of the
project grid, the "More work" rail, the sitemap, and search indexes
(`noindex`), and it shows an "unlisted / staging" banner. Remove the line to
publish.

### `card.md`

```
---
id: filament-winder          # the public URL: jamesnotley.com/filament-winder/  (defaults to the slug)
index: "001"                 # the "PROJECT 00X" label; defaults to folder position
title: Filament Winding Machine and Non-Cylindrical Toolpath Generator
year: "2025"
category: aerospace
tags: [composites, g-code, golang, failure]
image: images/winder.jpg     # optional grid-card thumbnail
draft: true                  # optional: build the page but keep it unlisted (see below)
---

One sentence. This is the card brief and the lead line on the project page.
```

### `article.md`

```
---
meta:
  - { key: Scope, value: "Independent project, year 2" }
  - { key: Role, value: Sole contributor }
skills: "composites manufacturing · motion control · Go and Python"
---

Body goes here.
```

Body Markdown maps to the design-system blocks:

| You write | You get |
| --- | --- |
| `## Heading` | section heading |
| paragraph | body paragraph |
| `**Lead sentence.** rest…` | paragraph with a bold strong opening |
| `**Title**` on its own line, then a list | the ruled, numbered "At a glance"-style list |
| `- item` / `1. item` | list rows |
| `> [!note] Title` / `> body` | a Callout. Tones: `note`, `ok`, `warn`, `fail` |
| GFM table, then an `*italic line*` under it | SpecTable with that line as its caption |
| `![alt](images/x.jpg "Caption")` | a numbered Figure (FIG 1, FIG 2, …). Videos (`.mp4/.webm/.mov`) become a `<video>` in the same frame. |
| `![](images/x.jpg)` | same, but with a placeholder **"Add a caption"** where the caption goes — replace it by filling the `"…"` |
| `[text](https://…)` | a link |
| `skills:` in frontmatter | the trailing "Skills: …" line |

Images are referenced by path relative to the project folder
(`images/x.jpg`); only files actually referenced get copied into the build.
