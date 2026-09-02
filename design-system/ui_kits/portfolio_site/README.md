# UI kit — Portfolio site

Click-through recreation of the public portfolio at 1280px.

Structure: home is the only composed page. Every other page is an 820px article whose title is
the file-tree path bar, with images appearing only inside the writeup.

Screens
- `HomeScreen.jsx` — hero (gradient headline + Terminal readout), filterable project grid, writing list.
- `ProjectScreen.jsx` — article case study. Body content is a block array (`{h}`, `{p}`, `{fig}`,
  `{table}`, `{note}`) rendered by `ArticleBlock`, so figures and tables sit in the text flow.
- `AboutScreen.jsx` — prose-led: bio, experience, method tags with tooltips, certifications, contact.
- `WritingScreen.jsx` — papers and notes with one-paragraph descriptions.
- `App.jsx` — routing, ScrollBackdrop mount, SiteHeader/SiteFooter, contact Dialog, dark ↔ paper switch.
- `data.js` — sample content (`window.SITE_DATA`), including `backdrop: []` for the background
  image paths. Project copy is illustrative placeholder written in the brand voice; swap it for
  real projects.

Interactions
- Header nav and footer nav switch screens; "Contact" opens the modal (Send shows the queued state).
- Project cards and the "Other work" rail open case studies; Back returns to the grid.
- Tabs + the prompt-style filter input narrow the grid; the empty state is shown when nothing matches.
- The "Paper" switch sets `data-theme="paper"` on `<body>` to preview the print palette live (it also
  hides the backdrop).
- The background is `ScrollBackdrop`: one micrograph, full-viewport, behind the rgba(18,18,18,.85)
  scrim and a 6px blur, visible while the page is at the top and fading in/out as it scrolls away
  from / back to the top. Work/about/writing pick one image at random from
  `window.SITE_DATA.backdrop`; project pages use that project's `cover` (or `coverAlternate`)
  instead. With no image supplied it shows a labelled placeholder slot.

Everything is composed from the published components — no local re-implementations.
