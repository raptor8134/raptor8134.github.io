/* Build portfolio_site/ from the Markdown in content/ + the design-system export in design-system/. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DS = path.join(ROOT, "design-system");           // untouched design-system export
const SRC_SCREENS = path.join(ROOT, "src");                // our screens that read window.SITE_DATA
const CONTENT = path.join(ROOT, "content");                // author-editable Markdown
const VENDOR = path.join(ROOT, "vendor");
const OUT = path.join(ROOT, "portfolio_site");
const OUT_ASSETS = path.join(OUT, "assets");

const Babel = require(path.join(VENDOR, "babel-standalone.js"));
const { marked } = require(path.join(VENDOR, "marked.min.js"));
const yaml = require(path.join(VENDOR, "js-yaml.min.js"));

const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => fs.existsSync(p);
const inline = (md) => marked.parseInline(String(md == null ? "" : md), { breaks: false }).trim();

/* ----- frontmatter ----- */
function parseFront(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  return { data: yaml.load(m[1]) || {}, body: m[2] };
}

/* ----- markdown body -> typed block array (matches ArticleBlock) ----- */
function mdToBlocks(md, ctx) {
  const toks = marked.lexer(String(md || ""));
  const blocks = [];
  let pendingTitle = null; // inline-html of a bold-only paragraph awaiting a list
  const flushTitle = () => {
    if (pendingTitle != null) { blocks.push({ p: `<strong>${pendingTitle}</strong>` }); pendingTitle = null; }
  };

  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.type === "space") continue;

    if (t.type === "paragraph") {
      const text = t.text.trim();

      // whole paragraph is one image -> Figure
      const mi = /^!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"([^"]*)")?\s*\)$/.exec(text);
      if (mi) { flushTitle(); blocks.push({ fig: figure({ text: mi[1], href: mi[2], title: mi[3] }, ctx) }); continue; }

      // italic-only line right after a table -> table caption
      const mc = /^\*(?!\*)([\s\S]+?)\*$/.exec(text);
      if (mc && blocks.length && blocks[blocks.length - 1].table && !blocks[blocks.length - 1].table.caption) {
        blocks[blocks.length - 1].table.caption = inline(mc[1]); continue;
      }

      // bold-only line -> title for the list that follows (or its own strong line)
      const mb = /^\*\*([\s\S]+?)\*\*$/.exec(text);
      if (mb) { flushTitle(); pendingTitle = inline(mb[1]); continue; }

      // "**Lead sentence.** rest of the paragraph" -> {lead, p}
      const ml = /^\*\*([\s\S]+?)\*\*\s+([\s\S]+)$/.exec(text);
      if (ml) { flushTitle(); blocks.push({ lead: inline(ml[1]), p: inline(ml[2]) }); continue; }

      flushTitle();
      blocks.push({ p: inline(text) });
      continue;
    }

    if (t.type === "list") {
      const items = t.items.map((it) => inline(it.text));
      blocks.push({ list: { title: pendingTitle != null ? pendingTitle : undefined, items } });
      pendingTitle = null;
      continue;
    }

    flushTitle();

    if (t.type === "heading") {
      if (t.depth <= 2) blocks.push({ h: inline(t.text) });
      else blocks.push({ p: `<strong>${inline(t.text)}</strong>` });
      continue;
    }

    if (t.type === "blockquote") {
      const raw = (t.text || "").trim();
      const m = /^\[!(\w+)\]([^\n]*)\n?([\s\S]*)$/.exec(raw);
      const tones = { note: "note", info: "note", tip: "ok", ok: "ok", success: "ok", warn: "warn", warning: "warn", caution: "warn", fail: "fail", danger: "fail", error: "fail" };
      if (m) {
        blocks.push({ note: { tone: tones[m[1].toLowerCase()] || "note", title: m[2].trim() || undefined, children: inline(m[3].trim().replace(/\n+/g, " ")) } });
      } else {
        blocks.push({ note: { tone: "note", children: inline(raw.replace(/\n+/g, " ")) } });
      }
      continue;
    }

    if (t.type === "table") {
      blocks.push({
        table: {
          columns: t.header.map((h) => inline(h.text)),
          rows: t.rows.map((r) => r.map((c) => inline(c.text))),
        },
      });
      continue;
    }

    if (t.type === "hr") continue;
    // anything else (code, html, ...) -> pass through as a paragraph of its raw text
    if (t.raw && t.raw.trim()) blocks.push({ p: inline(t.raw.trim()) });
  }
  flushTitle();
  return blocks;
}

function figure(im, ctx) {
  ctx.figN = (ctx.figN || 0) + 1;
  let src = im.href;
  if (!/^(https?:|\/|data:)/.test(src)) {
    const base = src.replace(/^.*[/\\]/, "");
    ctx.images.add(base);
    src = ctx.imgBase + "/" + base;
  }
  return {
    src,
    alt: im.text || undefined,
    caption: im.title ? inline(im.title) : im.text ? inline(im.text) : undefined,
    index: "FIG " + ctx.figN,
  };
}

/* ----- hero headline ----- */
function headlineHtml(s) {
  return String(s || "")
    .replace(/\n+$/, "")
    .split("\n")
    .map((l) => l.replace(/\[\[([^\]]+)\]\]/g, '<span style="color:#2BE08A">$1</span>'))
    .join("<br>");
}

/* ----- assets ----- */
function copyInto(srcFile, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcFile, path.join(destDir, path.basename(srcFile)));
}
function listImages(dir) {
  if (!exists(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f)).sort();
}

/* ============================ assemble SITE_DATA ============================ */

// Start from a clean generated-asset tree (vendor/ and hand-added files untouched).
fs.mkdirSync(OUT_ASSETS, { recursive: true });
for (const d of ["backdrop", "projects", "micrographs"]) {
  fs.rmSync(path.join(OUT_ASSETS, d), { recursive: true, force: true });
}

// --- site.md ---
const siteFront = parseFront(read(path.join(CONTENT, "site.md"))).data;
const site = {
  name: siteFront.name || "",
  role: siteFront.role || "",
  nav: siteFront.nav || ["work", "about", "contact"],
  resume: siteFront.resume || null,
  hero: {
    intro: (siteFront.hero && siteFront.hero.intro || "").trim(),
    primaryCta: siteFront.hero && siteFront.hero.primaryCta || "Latest project",
    secondaryCta: siteFront.hero && siteFront.hero.secondaryCta || null,
    headlineHtml: headlineHtml(siteFront.hero && siteFront.hero.headline),
  },
  work: {
    index: siteFront.work && siteFront.work.index || "01",
    label: siteFront.work && siteFront.work.label || "Selected projects",
    tabs: (siteFront.work && siteFront.work.tabs) || [],
  },
  contact: (() => {
    const c = Object.assign(
      { blurb: "", email: "", phone: "", phoneHref: "", sentMessage: "> message queued." },
      siteFront.contact || {}
    );
    c.blurb = String(c.blurb).trim();
    return c;
  })(),
  footer: { links: (siteFront.footer && siteFront.footer.links) || [] },
};

// --- about.md ---
const aboutParsed = parseFront(read(path.join(CONTENT, "about.md")));
const about = {
  intro: (aboutParsed.data.intro || "").trim(),
  body: marked.lexer(aboutParsed.body).filter((t) => t.type === "paragraph").map((t) => inline(t.text)),
  experience: aboutParsed.data.experience || [],
  methods: aboutParsed.data.methods || [],
  education: aboutParsed.data.education || [],
};

// --- projects/*/ ---
const projDir = path.join(CONTENT, "projects");
const projSlugs = exists(projDir)
  ? fs.readdirSync(projDir).filter((d) => fs.statSync(path.join(projDir, d)).isDirectory()).sort()
  : [];

const projects = projSlugs.map((slug, idx) => {
  const dir = path.join(projDir, slug);
  const card = parseFront(read(path.join(dir, "card.md")));
  const id = card.data.id || slug.replace(/^\d+[-_]/, "");
  const outImgDir = path.join(OUT_ASSETS, "projects", id);
  const ctx = { images: new Set(), imgBase: "assets/projects/" + id, figN: 0 };

  let body = [];
  const artPath = path.join(dir, "article.md");
  let meta = [];
  if (exists(artPath)) {
    const art = parseFront(read(artPath));
    meta = art.data.meta || [];
    body = mdToBlocks(art.body, ctx);
    if (art.data.skills) body.push({ skills: String(art.data.skills).trim() });
  }

  // copy referenced + declared images
  let cardImage;
  if (card.data.image) { ctx.images.add(path.basename(card.data.image)); cardImage = ctx.imgBase + "/" + path.basename(card.data.image); }
  const imgSrcDir = path.join(dir, "images");
  ctx.images.forEach((name) => {
    const f = path.join(imgSrcDir, name);
    if (exists(f)) copyInto(f, outImgDir);
    else console.warn(`  ! ${slug}: image not found: images/${name}`);
  });

  return {
    id,
    index: card.data.index || String(idx + 1).padStart(3, "0"),
    title: card.data.title || id,
    year: card.data.year != null ? String(card.data.year) : "",
    category: card.data.category || "",
    tags: card.data.tags || [],
    summary: card.body.trim(),
    meta,
    cardImage,
    body,
  };
});

// --- backdrop images ---
let backdrop;
if (Array.isArray(siteFront.backdrop) && siteFront.backdrop.length) {
  backdrop = siteFront.backdrop;
} else {
  const files = listImages(path.join(CONTENT, "backdrop"));
  files.forEach((f) => copyInto(path.join(CONTENT, "backdrop", f), path.join(OUT_ASSETS, "backdrop")));
  backdrop = files.map((f) => "assets/backdrop/" + f);
}

const SITE_DATA = { site, about, projects, backdrop };

/* ============================ write output ============================ */

// content.js
fs.writeFileSync(
  path.join(OUT_ASSETS, "content.js"),
  "/* Generated by build/build.js from content/. Do not edit — edit the Markdown. */\n" +
    "window.SITE_DATA = " + JSON.stringify(SITE_DATA, null, 2) + ";\n"
);

// design-system CSS (resolve styles.css @imports)
const css = ["fonts", "colors", "typography", "spacing", "borders", "motion", "base"]
  .map((n) => `/* tokens/${n}.css */\n` + read(path.join(SRC_DS, "tokens", `${n}.css`)))
  .join("\n\n");

// design-system component bundle
fs.writeFileSync(path.join(OUT_ASSETS, "ds-bundle.js"), read(path.join(SRC_DS, "_ds_bundle.js")));

// React runtime, vendored
fs.mkdirSync(path.join(OUT_ASSETS, "vendor"), { recursive: true });
for (const f of ["react.production.min.js", "react-dom.production.min.js"]) {
  fs.copyFileSync(path.join(VENDOR, f), path.join(OUT_ASSETS, "vendor", f));
}

// resume
if (exists(path.join(CONTENT, "resume.pdf"))) copyInto(path.join(CONTENT, "resume.pdf"), OUT_ASSETS);

// screens: JSX -> JS at build time
const compiled = ["HomeScreen.jsx", "ProjectScreen.jsx", "AboutScreen.jsx", "App.jsx"]
  .map((f) => `/* ${f} */\n` + Babel.transform(read(path.join(SRC_SCREENS, f)), {
    presets: [["react", { runtime: "classic" }]], filename: f,
  }).code)
  .join("\n\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${site.name}${site.role ? " — " + site.role : ""}</title>
<meta name="description" content="Portfolio of ${site.name}${site.role ? ", " + site.role.toLowerCase() : ""}.">
<meta name="color-scheme" content="dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23121212'/%3E%3Ctext x='4' y='23' font-family='monospace' font-size='18' font-weight='700' fill='%232BE08A'%3Ejn%3C/text%3E%3C/svg%3E">
<style>
${css}
</style>
</head>
<body>
<div id="root"></div>

<script src="assets/vendor/react.production.min.js"></script>
<script src="assets/vendor/react-dom.production.min.js"></script>

<!-- Notley Design System — component bundle -->
<script src="assets/ds-bundle.js"></script>
<script>window.DS = window.NotleyDesignSystem_566c40;</script>

<!-- Site content, generated from content/*.md -->
<script src="assets/content.js"></script>

<!-- Screens (JSX pre-compiled at build time) -->
<script>
${compiled}
</script>

<script>
  ReactDOM.createRoot(document.getElementById("root")).render(
    React.createElement(window.App)
  );
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(OUT, "index.html"), html);

fs.writeFileSync(
  path.join(OUT, "README.md"),
  [
    "# portfolio_site/ — build output",
    "",
    "**Generated by `build/build.js`. Do not edit anything here** — edit the Markdown",
    "in `../content/`, then run `node build/build.js`.",
    "",
    "Self-contained: no build step at view time, no CDN, no runtime JSX compile.",
    "Deploy this folder as-is to any static host.",
    "",
    "    python3 -m http.server 8000      # then open http://localhost:8000/",
    "",
    "- `index.html`            markup + compiled design-system token CSS + inlined screens",
    "- `assets/content.js`     window.SITE_DATA, generated from ../content/*.md",
    "- `assets/ds-bundle.js`   Notley Design System component bundle",
    "- `assets/vendor/`        React 18.3.1 + ReactDOM, production, vendored",
    "- `assets/backdrop/`      hero images (from ../content/backdrop/)",
    "- `assets/projects/<id>/` per-project figures (from ../content/projects/*/images/)",
    "- `assets/resume.pdf`     from ../content/resume.pdf",
    "",
  ].join("\n")
);

console.log(`portfolio_site/  —  ${projects.length} project(s), ${about.body.length} about paragraph(s), ${backdrop.length} backdrop image(s)`);
projects.forEach((p) => console.log(`  ${p.index}  ${p.id}  (${p.body.length} block${p.body.length === 1 ? "" : "s"})`));
