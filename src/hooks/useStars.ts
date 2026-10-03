import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:quiz-stars";

function readStored(): Record<string, number> {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw as string) as unknown;
        if (parsed && typeof parsed === "object") {
          const out: Record<string, number> = {};
          for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
            if (typeof v === "number" && v >= 1 && v <= 3) out[k] = v;
          }
          return out;
        }
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return {};
}

function writeStored(map: Record<string, number>) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }
  } catch {
    /* ignore storage errors */
  }
}

/**
 * Best quiz score (1–3 stars) per story, persisted to localStorage on web.
 * Only ever moves up: kids replay to turn 2 stars into 3.
 */
export function useStars() {
  const [best, setBest] = useState<Record<string, number>>(readStored);

  const record = useCallback((id: string, stars: number) => {
    const s = Math.min(3, Math.max(1, Math.round(stars)));
    setBest((prev) => {
      if ((prev[id] ?? 0) >= s) return prev;
      const next = { ...prev, [id]: s };
      writeStored(next);
      return next;
    });
  }, []);

  return { best, record };
}
