/* Dev server with live reload.
 *
 *   node build/watch.js [port]
 *
 * Serves portfolio_site/ on http://localhost:4321 (or [port]), rebuilds whenever
 * anything under content/, src/, build/build.js, CNAME or the design-system
 * tokens/bundle changes, and reloads open browser tabs. Nothing it does touches
 * the committed output beyond a normal `node build/build.js`.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "portfolio_site");
const BUILD = path.join(__dirname, "build.js");
const PORT = Number(process.argv[2]) || 4321;

const WATCH = [
  "content",
  "src",
  "build/build.js",
  "CNAME",
  "design-system/tokens",
  "design-system/_ds_bundle.js",
].map((p) => path.join(ROOT, p));

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".avif": "image/avif", ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm",
  ".mov": "video/quicktime", ".pdf": "application/pdf", ".woff2": "font/woff2",
};

const LR_SNIPPET = `<script>
(function(){
  var es = new EventSource("/__livereload");
  es.onmessage = function(e){ if (e.data === "reload") location.reload(); };
  es.onerror = function(){ /* dev server restarting; EventSource retries on its own */ };
})();
</script>
`;

let clients = [];
function notify() {
  for (const res of clients) res.write("data: reload\n\n");
}

function build() {
  const t = Date.now();
  try {
    execFileSync(process.execPath, [BUILD], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    console.log(`  rebuilt in ${Date.now() - t}ms`);
    notify();
  } catch (err) {
    const msg = (err.stdout || "") + (err.stderr || "") || String(err);
    console.error("\n  BUILD FAILED\n" + msg.toString().split("\n").map((l) => "  " + l).join("\n"));
  }
}

let timer = null;
function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(build, 120);
}

// --- static file server ---------------------------------------------------------
function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  let p = path.normalize(path.join(OUT, clean));
  if (!p.startsWith(OUT)) return null; // path traversal guard
  try {
    const st = fs.statSync(p);
    if (st.isDirectory()) p = path.join(p, "index.html");
  } catch (_) {
    // maybe a clean URL without trailing slash: /foo -> /foo/index.html
    try {
      if (fs.statSync(p + path.sep).isDirectory()) p = path.join(p, "index.html");
    } catch (_2) {}
  }
  return fs.existsSync(p) && fs.statSync(p).isFile() ? p : null;
}

const server = http.createServer((req, res) => {
  if (req.url === "/__livereload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    });
    res.write("retry: 500\n\n");
    clients.push(res);
    req.on("close", () => { clients = clients.filter((c) => c !== res); });
    return;
  }

  const file = resolveFile(req.url);
  const send = (code, body, type) => {
    res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
    res.end(body);
  };

  if (!file) {
    const f404 = path.join(OUT, "404.html");
    return fs.existsSync(f404)
      ? send(404, fs.readFileSync(f404), MIME[".html"])
      : send(404, "404", MIME[".txt"]);
  }

  const ext = path.extname(file).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  if (ext === ".html") {
    let html = fs.readFileSync(file, "utf8");
    html = html.includes("</body>") ? html.replace("</body>", LR_SNIPPET + "</body>") : html + LR_SNIPPET;
    return send(200, html, type);
  }
  return send(200, fs.readFileSync(file), type);
});

// --- go ------------------------------------------------------------------------
console.log("building…");
build();

for (const target of WATCH) {
  if (!fs.existsSync(target)) continue;
  const opts = fs.statSync(target).isDirectory() ? { recursive: true } : {};
  fs.watch(target, opts, () => scheduleBuild());
}

server.listen(PORT, () => {
  console.log(`\n  dev server   http://localhost:${PORT}/`);
  console.log(`  live reload  on — edit content/ or src/ and the page refreshes`);
  console.log(`  stop         Ctrl-C\n`);
});

process.on("SIGINT", () => { console.log("\nbye"); process.exit(0); });
