# UI kit — Print dossier (PDF form)

The portfolio's second surface: the printable version. Two explicitly paginated A4 pages
inside `<doc-page>`, rendered in the `data-theme="paper"` scope so the ink ramp inverts and
the accent darkens to #12A870 / #0E9AA7 for contrast on white.

- `CvSheet.jsx` — page 1: wordmark header, summary, experience with em-dash bullets, education,
  certifications, method tags, running footer.
- `ProjectSheet.jsx` — page 2: one-page project sheet — metadata grid, method, two figures,
  SpecTable + Meters, conditions callout.
- Content comes from `../portfolio_site/data.js` so screen and print never drift.

Print rules used here: no drop shadows, hairlines at 1px, body text 10.5–12px (≈8–9pt), a 2px
solid rule under the header, and page furniture (page x / y) in 9px uppercase mono.
Export with the PDF action; `<doc-page>` owns page geometry.
