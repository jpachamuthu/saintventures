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

http
  .createServer((req, res) => {
    const url = req.url.split("?")[0];
    let filePath = path.normalize(path.join(ROOT, decodeURIComponent(url)));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(ROOT, "index.html");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Serving http://localhost:${PORT}`);
  });