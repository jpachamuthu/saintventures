import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GOOGLE_TTS_API_KEY;
const VOICE = process.env.NARRATION_VOICE || "en-US-Chirp3-HD-Aoede";
const SPEED = process.env.NARRATION_SPEED ? parseFloat(process.env.NARRATION_SPEED) : 0.95;
const TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

if (!API_KEY) {
  console.error("Missing GOOGLE_TTS_API_KEY. Set it and rerun, e.g.:");
  console.error('  $env:GOOGLE_TTS_API_KEY="..." ; node scripts/generate-narration.mjs');
  process.exit(1);
}

const ROOT = join(__dirname, "..");

function extractStories(ts) {
  const out = [];
  const storyBlocks = ts.split(/\{\s*\n\s*id:/).slice(1);
  for (const block of storyBlocks) {
    const idMatch = block.match(/^\s*"([^"]+)"/);
    const pagesMatch = block.match(/pages:\s*\[([\s\S]*?)\n    \],/);
    if (!idMatch || !pagesMatch) continue;
    const strings = [...pagesMatch[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
      JSON.parse(`"${m[1]}"`)
    );
    out.push({ id: idMatch[1], pages: strings });
  }
  return out;
}

async function synthesize(text) {
  const res = await fetch(TTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "en-US", name: VOICE },
      audioConfig: { audioEncoding: "MP3", speakingRate: SPEED, pitch: 0 },
      enableTimePointing: ["WORD"],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TTS request failed (${res.status}): ${body}`);
  }
  const json = await res.json();
  return { audio: json.audioContent, timepoints: json.timepoints || [] };
}

async function main() {
  const ts = await readFile(join(ROOT, "src", "data", "stories.ts"), "utf8");
  const stories = extractStories(ts);
  console.log(`Found ${stories.length} stories`);

  for (const story of stories) {
    const outDir = join(ROOT, "assets", "narration", story.id);
    await mkdir(outDir, { recursive: true });
    for (let p = 0; p < story.pages.length; p++) {
      const { audio, timepoints } = await synthesize(story.pages[p]);
      await writeFile(join(outDir, `page-${p}.mp3`), Buffer.from(audio, "base64"));
      await writeFile(
        join(outDir, `page-${p}.json`),
        JSON.stringify({
          timepoints: timepoints.map((t) => ({
            charIndex: t.timeIndex,
            timeMs: Math.round(t.markName * 1000),
          })),
        })
      );
      console.log(`${story.id} page ${p}: ${timepoints.length} words (${(audio.length / 1024 / 4).toFixed(1)} KB mp3)`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
