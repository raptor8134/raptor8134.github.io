# Notley Design System

The design system for **James Notley — Materials Engineer**: a personal portfolio of
engineering projects that lives in two forms, a website and a set of printable PDFs.

The look is a terminal user interface rendered with restraint: a rgba(18,18,18,.85) scrim over scrolling microstructure photography, hairline rules instead of
shadows or glow, mono type doing most of the work, and one spring-green → deep-blue
gradient reserved for accents. It should read like a well-kept lab instrument, not a
sci-fi console.

## Sources

There were no attached sources for this build — no codebase, Figma file, deck or existing
site. Everything here was authored from the written brief:

> "James Notley, Materials Engineer: My personal portfolio of engineering projects, in website
> and pdf form." · "Loosely inspired by terminal user interface style, with clean lines and a
> blue-green gradient for accent colors."

Consequences worth knowing:
- **There is no logo.** The wordmark (`Logotype`) is the brand name set in bold mono with a
  blinking block cursor. No graphic mark was invented; do not draw one.
- **Fonts are Google Fonts** (JetBrains Mono, Space Grotesk), loaded from CDN — see Typography.
- **Icons are Lucide** from CDN — see Iconography.
- **All project copy is placeholder** written in the brand voice (alloys, standards, figures).
  Replace it with James's real projects; keep the voice.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import`s only. Consumers link this one file. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `borders`, `motion`, `base` |
| `components/core/` | Button, IconButton, Icon, Badge, Tag, Card, SectionRule, Logotype |
| `components/backdrop/` | ScrollBackdrop — the scroll-linked microstructure background |
| `components/forms/` | Input, Textarea, Select, Checkbox, Switch |
| `components/navigation/` | SiteHeader, Tabs, Breadcrumb |
| `components/data/` | SpecTable, KeyValueList, Meter, Terminal, Figure |
| `components/feedback/` | Callout, Dialog, Tooltip |
| `guidelines/` | 20 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `ui_kits/portfolio_site/` | Click-through website: home, project detail, about, contact |
| `ui_kits/print_dossier/` | Two-page A4 dossier: CV sheet + project sheet (paper theme) |
| `templates/portfolio-page/` | Template: case-study project page (Design Component) |
| `templates/project-sheet/` | Template: printable A4 one-page project sheet |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent-skill wrapper for use outside this project |

Each component directory also carries `<Name>.d.ts` (props contract) and `<Name>.prompt.md`
(what & when, usage example, variants), plus one `@dsCard` HTML showing its states.

### Intentional additions

- **Icon** — a thin wrapper over the Lucide set. The brief defines no icon system, so a single
  wrapper keeps every glyph on one stroke weight and in `currentColor`.
- **ScrollBackdrop** — the scrolling microstructure background is a brand mechanism, not page
  furniture; as a component it stays consistent and takes the scrim rules with it.
- **Terminal** — not a conventional primitive, but it is the brief's central motif; making it a
  component stops it being re-hand-rolled (badly) on every page.
- **SectionRule / Logotype** — brand structure and the wordmark, needed because there is no logo.

## Content fundamentals

The voice is an engineer writing up work for other engineers: specific, quantified,
unembarrassed by detail, and never salesy.

- **First person, plain.** "I work on metal parts that have to survive load, heat and time."
  Not "James is a passionate engineer". Never third person about himself.
- **Lead with the outcome, then the number.** "Cut post-HIP scrap by 38% by re-orienting
  load-bearing struts within 20° of vertical." Every claim carries a figure or a standard.
- **Name the method and the standard.** "Tensile after HIP, ASTM E8", "ISO 5817 B",
  "Room temperature, 10 Hz, R = 0.1, n = 6". Table captions always say how it was measured.
- **Sentence case for prose; UPPERCASE only for labels.** Headings are sentence case
  ("Fatigue-resistant lattice inserts"). Uppercase with `--track-caps` is reserved for
  labels, section rules, badges and buttons — never for a sentence.
- **Lowercase, hyphenated for machine-ish text.** Tags (`ti-6al-4v`, `sem`), breadcrumb
  segments (`~ / work / lattice-inserts`), terminal commands (`ls work/`), file names.
- **Units and numerals.** Thin space before the unit (`1043 MPa`, `11.2 %`), `×` for
  scientific notation (`1.0 × 10⁶`), `±` for scatter, `n =` for sample count. Tabular
  figures everywhere numbers align.
- **Length.** Project summaries are one sentence. Body paragraphs are two or three. If a
  paragraph needs a fourth, it wants to be a table.
- **Absence is stated, not hidden.** "Write-up in progress." "Alloy composition withheld under
  NDA." "Add a portrait photograph here." Never fill a gap with marketing copy.
- **No emoji. No exclamation marks.** No "passionate", "innovative", "cutting-edge",
  "leveraging". No rhetorical questions as headings.
- **You vs I.** "I" for the work; "you" only in interface copy addressed to the reader
  ("Send me the one-page project index"). Buttons are imperative verbs: DOWNLOAD CV, SEND.

## Visual foundations

**Colour.** The canvas is `rgba(18,18,18,.85)` — a scrim, not a solid — sitting over the
microstructure backdrop with a 6px blur, so the page always has a faint image beneath it. Behind
that scrim runs a neutral seven-step ink ramp (`#0C0C0C` → `#3D3D3D`) for panels and wells, all
of them semi-transparent (.78–.86) so the backdrop reads through. Foreground is four steps only —
strong / body / muted / faint. The accent is a single gradient, spring green `#2BE08A` → deep
blue `#1B4FD1`, at 90° for rules, fills and gradient text, 135° for large planes, never radial;
azure `#3D7BFF` is the interactive step (focus rings, info). Signals mean status only and never
decorate. A `[data-theme="paper"]` scope inverts everything for print and darkens the accent to
`#12A870` / `#123C9E` so it holds contrast on white.

**Type.** JetBrains Mono is the body face — 13px / 1.55, ligatures off, tabular numerals.
Space Grotesk is the display face for headings and the hero, tight tracking (`-0.02em`),
line-height 1.1. Scale is 10 → 72px on a 1.25 ratio. Labels are 10px mono, uppercase, 0.14em
tracking. Prose is capped at 66ch.

**Spacing and layout.** 4px base, and an 8px character cell that mirrors the mono advance
width; blocks land on a 24px line (the `--grid-overlay` texture is that grid made visible).
Container 1160px, sidebar rail 248px. The site header is the only fixed element — 56px, sticky,
translucent (`color-mix` at 88%) with an 8px backdrop blur, one hairline bottom rule. Project
detail pages use a sticky metadata rail. Nothing else is fixed; no parallax.

**Borders, corners, depth.** **Nothing is rounded.** Every radius token is `0`; there are no
exceptions, and none should be added. Depth comes from 1px rules (`--line-1` at 16% opacity,
`--line-2` at 28%, accent at 45%) and inset wells — no drop shadows and **no glow**. The only
box-shadow in the system is `--ring-focus`, a flat 1px azure ring. Dashed hairlines carry leader
dots and empty states.

**Cards.** `--surface-card` (rgba(24,24,24,.78)), 1px hairline, square corners, no shadow. An optional
uppercase header strip (label left, index right) divided by a hairline, and a hairline footer
row for the read-more affordance. Hover raises the surface one ink step, turns the border
accent and the header label spring green. Coloured left borders appear in exactly one place in
this system — `Callout`, at 2px, in a signal colour. Nowhere else.

**Backgrounds and texture.** The site background is `ScrollBackdrop`. The rule: it shows one
micrograph full-width and full-height, under the house `rgba(18,18,18,.85)` scrim and a 6px blur,
while the page sits at the very top. Scrolling away from the top fades that image out, exposing
the regular page background; scrolling back to the top brings it back. Listing pages
(work/about/writing) pick one image at random from a pool; project detail pages use that
project's cover image, or its cover-alternate where one is provided, instead of a random pick.
Mount it once at the app root; never place a photograph behind text without that scrim, and
never let the imagery become the subject. Two textures beyond it: `--scanline` (2.5% white, 1px
on 3px, terminal blocks) and `--grid-overlay` (6% rules on 24px, empty figure slots).
`--grad-accent-soft` is the wash for selected states. No noise, no mesh gradients, no bluish-purple.

**Imagery.** Technical and cool: micrographs, rig photos, fracture surfaces, plots. Slightly
desaturated (`saturate(.85)`), captioned with a spring-green figure number and a one-line
technical caption. Where there is no photograph, the `Figure` placeholder — grid-ruled well and
a mono label — is the correct answer. Never stock imagery, never illustration.

**Transparency and blur.** Three uses, all of them functional: the sticky header
(`backdrop-filter: blur(8px)`), the dialog scrim (`rgba(5,8,11,.72)` + 3px blur), and hover
fills (`rgba(255,255,255,.045)`). Content itself is never translucent.

**Motion.** 80 / 140 / 240 / 420ms on `cubic-bezier(.2,.8,.2,1)` — quick out, settled. Colour
and border transitions on every control; meter bars grow over 420ms. The cursor blinks at 1s in
two steps (`ds-blink`), the one perpetual animation allowed. No bounce, no spring, no scroll
reveal, no page transitions.

**States.** Hover: surface lifts to `--bg-hover`, border goes accent, text goes strong — the
gradient button brightens 8% instead. Press: 1px downward nudge, `--bg-active`. Focus:
`--ring-focus`, a flat 1px azure ring, and the field's label turns accent.
Selected: soft gradient wash plus an accent rule. Disabled: 40% opacity, no colour change.
Invalid: border and hint recolour to `--signal-fail`; the field never shakes.

## Iconography

- **System: Lucide** (24×24, 2px stroke, round caps), loaded from
  `unpkg.com/lucide-static@0.451.0/icons/<name>.svg`. **This is a substitution** — the brief
  defines no icon set. Lucide was chosen for its thin, even stroke, which matches hairline
  rules and mono type better than a filled set. Flagged for review: if James has a preferred
  set, swapping it means changing one `BASE` constant in `components/core/Icon.jsx`.
- **Delivery.** `Icon` applies the SVG as a CSS `mask-image` with `background: currentColor`,
  so every glyph inherits text colour and no SVG is ever pasted into markup. Sizes are 13 / 15 /
  18px to match the 26 / 32 / 40px control heights. Never scale a glyph above 18px in UI; large
  graphics are figures, not icons.
- **House set.** arrow-up-right (external / read more), arrow-right, arrow-left, arrow-down,
  download, external-link, chevron-right, chevron-down, search, x, check, info,
  triangle-alert, octagon-alert, file-text, mail, github, grid-2x2, terminal, layers.
- **Non-icon glyphs carry meaning here.** `>` is the prompt caret (always spring green),
  `~ /` builds breadcrumb paths, `#` prefixes tags, `—` opens CV bullets, `·` separates
  metadata, and the solid block `▮` is the cursor. These are typographic, set in the mono
  face — not icons, and not to be replaced by icons.
- **Emoji are never used.** Not in UI, not in copy, not in headings.
- **Assets.** `assets/` is empty by design: no logo, no illustrations and no photography were
  provided. Drop real micrographs, rig photos and a portrait there and reference them from
  `Figure`.

## Adherence notes

- Compose from the published components; do not re-implement Button, Card or Terminal locally.
- Reference colour, type and spacing through the custom properties, never literal hex or px
  for values a token already covers.
- One `primary` button per view. One `Terminal` per page. At most two gradient rules per page.
- No drop shadows, no glow, no rounded corners anywhere, no emoji, no second icon family.

## Page structure

- **Home** is the only visually composed page: hero, terminal readout, project grid, writing list.
- **Every other page is an article** — 820px column, path bar (`Breadcrumb size="lg"`) as the
  title, then prose. Images appear only as part of the writeup (`Figure` in the text flow), never
  as decoration or as a hero. No metadata rails, no sidebars, no portrait blocks.
- **Project state badges are not used.** A project's page and its numbers say where it stands.
