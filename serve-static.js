const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8188;
const ROOT = path.join(__dirname, "dist");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

const BUILDING_HTML = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="2">
<title>Building…</title><style>body{background:#0B0B1E;color:#EF9E56;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
.p{text-align:center}.t{font-size:16px;font-weight:600;letter-spacing:1px}.s{color:#8B82A0;font-size:12px;margin-top:8px}</style></head>
<body><div class="p"><div class="t">Rebuilding web app…</div><div class="s">This page refreshes automatically in 2 seconds.</div></div></body></html>`;

function safeSend(res, code, body, type) {
  try {
    res.writeHead(code, { "Content-Type": type });
    res.end(body);
  } catch (e) {
    /* ignore */
  }
}

http
  .createServer((req, res) => {
    try {
      const url = req.url.split("?")[0];

      if (!fs.existsSync(ROOT)) {
        safeSend(res, 503, BUILDING_HTML, "text/html; charset=utf-8");
        return;
      }

      let filePath = path.normalize(path.join(ROOT, decodeURIComponent(url)));
      if (!filePath.startsWith(ROOT)) {
        safeSend(res, 403, "Forbidden", "text/plain");
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(ROOT, "index.html");
      }
      if (!fs.existsSync(filePath)) {
        safeSend(res, 503, BUILDING_HTML, "text/html; charset=utf-8");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      const stream = fs.createReadStream(filePath);
      stream.on("error", () => {
        safeSend(res, 503, BUILDING_HTML, "text/html; charset=utf-8");
      });
      stream.pipe(res);
    } catch (e) {
      safeSend(res, 503, BUILDING_HTML, "text/html; charset=utf-8");
    }
  })
  .listen(PORT, () => {
    console.log(`Serving http://localhost:${PORT}`);
  });