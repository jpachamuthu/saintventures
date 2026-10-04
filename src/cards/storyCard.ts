import { storyPageText, type Story } from "../data/stories";
import { assetUri } from "./prayerCard";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Fetch a bundled asset, downscale it, and return a JPEG data URL so the
 * downloaded storybook stays self-contained (works offline) without
 * ballooning to full-resolution PNG sizes.
 */
async function assetDataUrl(asset: unknown, maxDim = 1200): Promise<string | null> {
  try {
    const uri = assetUri(asset);
    if (!uri || typeof document === "undefined") return null;
    const res = await fetch(encodeURI(uri));
    if (!res.ok) return null;
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * scale));
    const h = Math.max(1, Math.round(bmp.height * scale));
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bmp, 0, 0, w, h);
    if (typeof bmp.close === "function") bmp.close();
    return c.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
}

/**
 * Downloads a printable storybook HTML file styled like the SaintVentures
 * storybook template: cover page with hero banner, one page per story
 * paragraph with drop caps and page numbers, and a back cover with the
 * tile thumbnail as a keepsake.
 */
export async function downloadStoryBookHtml(story: Story): Promise<void> {
  try {
    if (typeof document === "undefined") return;
    const pages = story.pages.map((_, i) => storyPageText(story, i));
    const total = pages.length;
    const [heroUrl, tileUrl] = await Promise.all([
      assetDataUrl(story.hero),
      assetDataUrl(story.imageSmall, 600),
    ]);

    const pageHtml = pages
      .map(
        (text, i) => `
    <section class="page">
      <div class="glyph">✦</div>
      <p class="body">${esc(text)}</p>
      <div class="pagenum">${i + 1} / ${total}</div>
    </section>`
      )
      .join("\n");

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(story.title)} — SaintVentures Storybook</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #fff;
    color: #2B3055;
    font-family: Georgia, "Times New Roman", serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    max-width: 5.5in;
    min-height: 8.5in;
    margin: 0 auto;
    padding: 0.85in 0.7in 0.6in;
    text-align: center;
    page-break-after: always;
    position: relative;
  }
  .glyph {
    color: #EF9E56;
    font-size: 28px;
    margin-bottom: 24px;
  }
  .eyebrow {
    color: #EF9E56;
    font-family: Verdana, sans-serif;
    font-weight: bold;
    font-size: 11px;
    letter-spacing: 4px;
  }
  h1 {
    font-family: Verdana, sans-serif;
    font-size: 27px;
    line-height: 1.25;
    margin: 18px 0 0;
  }
  .saint {
    color: #D9823F;
    font-family: Verdana, sans-serif;
    font-weight: 600;
    font-size: 14px;
    margin-top: 16px;
  }
  .rule {
    width: 120px;
    border: none;
    border-top: 1px solid #E9D9BE;
    margin: 18px auto;
  }
  .hero {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 12px;
    margin: 4px 0 18px;
  }
  .blurb {
    color: #6D748F;
    font-family: Verdana, sans-serif;
    font-size: 11px;
    line-height: 1.7;
  }
  .foot {
    position: absolute;
    bottom: 0.55in;
    left: 0;
    right: 0;
    color: #6D748F;
    font-family: Verdana, sans-serif;
    font-weight: 600;
    font-size: 9px;
    letter-spacing: 1px;
  }
  .body {
    font-size: 13px;
    line-height: 1.75;
  }
  .body::first-letter {
    color: #D9823F;
    font-weight: bold;
    font-size: 22px;
  }
  .pagenum {
    margin-top: 28px;
    color: #6D748F;
    font-family: Verdana, sans-serif;
    font-weight: 600;
    font-size: 10px;
  }
  .thumb {
    width: 1.5in;
    height: 1.5in;
    object-fit: cover;
    border-radius: 18px;
    margin: 6px auto 4px;
  }
  .end-title {
    font-family: Verdana, sans-serif;
    font-size: 18px;
    margin: 18px 0 0;
  }
  .thanks {
    color: #6D748F;
    font-family: Verdana, sans-serif;
    font-size: 11px;
    line-height: 1.7;
    margin-top: 14px;
  }
  .brand {
    color: #EF9E56;
    font-family: Verdana, sans-serif;
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 1px;
  }
  @media print {
    .page { margin: 0; max-width: none; }
  }
</style>
</head>
<body>
  <section class="page">
    <div class="glyph">✦</div>
    <div class="eyebrow">S A I N T &nbsp; A D V E N T U R E S</div>
    <h1>${esc(story.title)}</h1>
    <div class="saint">${esc(story.saint.toUpperCase())}</div>
    <hr class="rule" />
    ${heroUrl ? `<img class="hero" src="${heroUrl}" alt="" />` : ""}
    <div class="blurb">${esc(story.blurb)}</div>
    <div class="foot">A SAINTVENTURES STORYBOOK</div>
  </section>
${pageHtml}
  <section class="page">
    ${tileUrl ? `<img class="thumb" src="${tileUrl}" alt="" />` : `<div class="glyph">✦</div>`}
    <div class="end-title">The End</div>
    <div class="thanks">Thank you for reading with us.<br />Find more saints, more stories,<br />and more wonder in the app.</div>
    <div class="foot brand">SAINTVENTURES.APP</div>
  </section>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.id}-storybook.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch {
    /* download is best-effort */
  }
}
