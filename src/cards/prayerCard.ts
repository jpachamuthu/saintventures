import { Image as RNImage, Platform } from "react-native";
import { prayers } from "../data/prayers";
import { feastDays, MONTH_NAMES } from "../data/feastDays";
import type { Story } from "../data/stories";

const W = 1080;
const PH = 740;
const GOLD = "#F5C451";
const CREAM = "#FFF8EC";
const INK = "13,16,48";

function loadImage(uri: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = encodeURI(uri);
  });
}

/**
 * Metro web require() returns an asset object with a uri (not a numeric id),
 * and Image.resolveAssetSource is not reliably present on web — so read the
 * uri straight off the asset, falling back to the static resolver on native.
 */
export function assetUri(asset: unknown): string | null {  if (asset == null) return null;
  if (typeof asset === "string") return asset;
  if (typeof asset === "object") {
    const u = (asset as { uri?: unknown }).uri;
    if (typeof u === "string" && u.length > 0) return u;
  }
  try {
    const r = (RNImage as any)?.resolveAssetSource;
    if (typeof r === "function") {
      const resolved = r.call(RNImage, asset);
      if (resolved && typeof resolved.uri === "string") return resolved.uri;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const trial = line ? `${line} ${w}` : w;
    if (ctx.measureText(trial).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function shrinkToFit(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, start: number, min: number, style: (px: number) => string): number {
  let px = start;
  ctx.font = style(px);
  while (px > min && ctx.measureText(text).width > maxWidth) {
    px -= 2;
    ctx.font = style(px);
  }
  return px;
}

/**
 * Renders the shareable prayer card (web only):
 * saint portrait filling the top, a dark gradient taking over from the
 * midpoint down, gold caps name/title above centered prayer text.
 * The card height grows to fit the ENTIRE prayer — nothing is ever cut.
 * Returns null on native or when anything is unavailable.
 */
export async function renderPrayerCard(story: Story): Promise<HTMLCanvasElement | null> {
  if (Platform.OS !== "web" || typeof document === "undefined") return null;
  const prayer = prayers[story.id];
  if (!prayer) return null;
  try {
    await (document as any).fonts?.ready;
  } catch {
    /* fall back to system fonts */
  }

  // Measure everything first so the canvas height fits all of it.
  const meas = document.createElement("canvas").getContext("2d");
  if (!meas) return null;
  const maxW = 880;
  let pfs = 46;
  meas.font = `600 ${pfs}px "CormorantGaramond_600SemiBold", Georgia, serif`;
  let lines = wrapText(meas, prayer.text, maxW);
  while (lines.length > 9 && pfs > 34) {
    pfs -= 2;
    meas.font = `600 ${pfs}px "CormorantGaramond_600SemiBold", Georgia, serif`;
    lines = wrapText(meas, prayer.text, maxW);
  }
  const lh = pfs * 1.45;
  const prayerStartY = 985;
  const prayerEndY = prayerStartY + (lines.length - 1) * lh;
  meas.font = 'italic 24px "Nunito_400Regular", sans-serif';
  const fnLines = wrapText(meas, prayer.footnote, maxW).slice(0, 3);
  const footnoteStartY = prayerEndY + 46;
  const footnoteEndY = fnLines.length ? footnoteStartY + (fnLines.length - 1) * 32 : prayerEndY;
  const H = Math.max(1350, Math.ceil(footnoteEndY + 220));

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base.
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#1A2050");
  bg.addColorStop(1, "#0D1440");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Portrait: cover-fit the top region.
  const asset = story.imageSmall ?? story.hero;
  let painted = false;
  if (asset != null) {
    try {
      const uri = assetUri(asset);
      if (uri) {
        const img = await loadImage(uri);
        const s = Math.max(W / img.naturalWidth, PH / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        ctx.drawImage(img, (W - dw) / 2, (PH - dh) / 2, dw, dh);
        painted = true;
      }
    } catch {
      /* fall through to emblem */
    }
  }
  if (!painted) {
    ctx.strokeStyle = "rgba(245,196,81,0.8)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(W / 2, PH / 2, 150, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = GOLD;
    ctx.font = "200px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✝", W / 2, PH / 2 + 10);
  }

  // Dark gradient takeover from the midpoint down.
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, `rgba(${INK},0)`);
  g.addColorStop(444 / H, `rgba(${INK},0)`);
  g.addColorStop(750 / H, `rgba(${INK},0.55)`);
  g.addColorStop(950 / H, `rgba(${INK},0.95)`);
  g.addColorStop(1, `rgba(${INK},1)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Saint name in gold caps, panel serif.
  try {
    (ctx as any).letterSpacing = "8px";
  } catch {
    /* ignore */
  }
  ctx.fillStyle = GOLD;
  const namePx = shrinkToFit(ctx, story.saint.toUpperCase(), 920, 44, 26, (px) => `700 ${px}px "CormorantGaramond_700Bold", Georgia, serif`);
  void namePx;
  const nameY = 805;
  ctx.fillText(story.saint.toUpperCase(), W / 2, nameY);
  try {
    (ctx as any).letterSpacing = "0px";
  } catch {
    /* ignore */
  }

  // Feast date beneath the name.
  const feast = feastDays.find((f) => f.story.id === story.id);
  let titleY = nameY + 54;
  if (feast) {
    ctx.fillStyle = GOLD;
    ctx.font = '600 28px "Nunito_700Bold", sans-serif';
    try {
      (ctx as any).letterSpacing = "5px";
    } catch {
      /* ignore */
    }
    ctx.fillText(`FEAST · ${feast.day} ${MONTH_NAMES[feast.month - 1].toUpperCase()}`, W / 2, nameY + 44);
    try {
      (ctx as any).letterSpacing = "0px";
    } catch {
      /* ignore */
    }
    titleY = nameY + 92;
  }

  // Story title beneath, soft panel serif.
  ctx.fillStyle = "rgba(255,248,236,0.85)";
  shrinkToFit(ctx, story.title, 880, 30, 22, (px) => `italic 600 ${px}px "CormorantGaramond_600SemiBold", Georgia, serif`);
  ctx.fillText(story.title, W / 2, titleY);

  // Prayer text in full — the canvas was sized to hold every line.
  ctx.font = `600 ${pfs}px "CormorantGaramond_600SemiBold", Georgia, serif`;
  ctx.fillStyle = CREAM;
  let y = prayerStartY;
  for (const line of lines) {
    ctx.fillText(line, W / 2, y);
    y += lh;
  }

  // Footnote, panel small italic.
  ctx.font = 'italic 24px "Nunito_400Regular", sans-serif';
  ctx.fillStyle = "rgba(255,248,236,0.6)";
  let fy = footnoteStartY;
  for (const line of fnLines) {
    ctx.fillText(line, W / 2, fy);
    fy += 32;
  }

  // App logo, bottom-left.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const logoUri = assetUri(require("../../assets/icon.png"));
    if (logoUri) {
      const logo = await loadImage(logoUri);
      const LS = 92;
      const lx = 60;
      const ly = H - 60 - LS;
      ctx.save();
      ctx.beginPath();
      const rr = 22;
      ctx.roundRect(lx, ly, LS, LS, rr);
      ctx.clip();
      ctx.drawImage(logo, lx, ly, LS, LS);
      ctx.restore();
      ctx.fillStyle = GOLD;
      ctx.font = '700 26px "Nunito_700Bold", sans-serif';
      ctx.textAlign = "left";
      try {
        (ctx as any).letterSpacing = "4px";
      } catch {
        /* ignore */
      }
      ctx.fillText("SAINTVENTURES", lx + LS + 20, ly + LS / 2 + 9);
      try {
        (ctx as any).letterSpacing = "0px";
      } catch {
        /* ignore */
      }
      ctx.textAlign = "center";
    }
  } catch {
    /* logo is decorative; never break the card */
  }

  return canvas;
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((res) => canvas.toBlob(res, "image/png"));
}

/** Download the prayer card image (web only). */
export async function downloadPrayerCard(story: Story): Promise<boolean> {
  try {
    const canvas = await renderPrayerCard(story);
    if (!canvas) return false;
    const blob = await canvasToBlob(canvas);
    if (!blob) return false;
    saveBlob(blob, `${story.id}-prayer.png`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Open the standard share sheet with the prayer card image (WhatsApp, etc.).
 * Falls back to downloading where system sharing with files is unavailable.
 */
export async function sharePrayerCard(story: Story): Promise<boolean> {
  try {
    const canvas = await renderPrayerCard(story);
    if (!canvas) return false;
    const blob = await canvasToBlob(canvas);
    if (!blob) return false;
    const file = new File([blob], `${story.id}-prayer.png`, { type: "image/png" });
    const nav = navigator as any;
    if (typeof nav.canShare === "function" && typeof nav.share === "function") {
      try {
        if (nav.canShare({ files: [file] })) {
          await nav.share({ files: [file], title: `${story.saint} prayer` });
          return true;
        }
      } catch (err: any) {
        // User dismissed the sheet: treat as done, don't surprise-download.
        if (err && err.name === "AbortError") return true;
      }
    }
    saveBlob(blob, `${story.id}-prayer.png`);
    return true;
  } catch {
    return false;
  }
}
