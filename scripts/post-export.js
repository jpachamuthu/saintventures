// Post-processes the Expo web export in dist/:
// 1. Copies the PWA install assets (manifest + high-res icons) into dist.
// 2. Injects manifest / icon links into dist/index.html so installed shortcuts
//    use crisp artwork instead of the tiny default favicon.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PWA = path.join(ROOT, "assets", "pwa");

for (const f of ["manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]) {
  fs.copyFileSync(path.join(PWA, f), path.join(DIST, f));
}

const htmlPath = path.join(DIST, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");
if (!html.includes('rel="manifest"')) {
  html = html.replace(
    "</head>",
    '  <link rel="manifest" href="/manifest.json" />\n' +
      '  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />\n' +
      '  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />\n' +
      "</head>"
  );
  fs.writeFileSync(htmlPath, html);
}
console.log("post-export: PWA assets + links injected");
