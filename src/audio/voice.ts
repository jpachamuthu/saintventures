import { Platform } from "react-native";
import * as Speech from "expo-speech";

let cached: string | null = null;
let pending: Promise<string | null> | null = null;

export function scoreVoice(v: { name: string; language: string; localService?: boolean }): number {
  const n = v.name;
  let s = 0;
  if (/online|natural|neural/i.test(n)) s += 4;
  if (v.localService === false) s += 1;
  if (/female|aria|jenny|michelle|ana|ava|erika|zira|samantha|susan|hazel|serena|libby|katherine|karen|moira|sonia|tessa|veena/i.test(n)) s += 3;
  if (/male|david|mark|guy|george|daniel|ryan|james|alex|christopher|eric|thomas|fred|liam|matthew/i.test(n)) s -= 4;
  if (/en[-_ ]?(US|USA)/i.test(v.language)) s += 2;
  else if (/^en/i.test(v.language)) s += 1;
  if (Platform.OS === "android") {
    if (/en[-_ ]?(US|USA)/i.test(v.language)) s += 2;
    if (/google/i.test(n)) s += 1;
  }
  return s;
}

export function getBestVoice(): Promise<string | null> {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = Speech.getAvailableVoicesAsync()
      .then((voices) => {
        if (voices.length === 0) return null;
        let best = voices[0];
        let bestScore = -Infinity;
        for (const v of voices) {
          const sc = scoreVoice(v);
          if (sc > bestScore) {
            bestScore = sc;
            best = v;
          }
        }
        cached = best.identifier || best.name;
        return cached;
      })
      .catch(() => null);
  }
  return pending;
}

export async function speakWithBestVoice(
  text: string,
  opts: { rate?: number; pitch?: number } = {}
) {
  const voice = await getBestVoice();
  Speech.speak(text, {
    language: "en",
    voice: voice ?? undefined,
    rate: opts.rate ?? 1,
    pitch: opts.pitch ?? 1,
  });
}
