import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:read-streak";

type StreakState = { last: string; count: number; best: number };

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function readStored(): StreakState {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw as string) as unknown;
        if (parsed && typeof parsed === "object") {
          const p = parsed as Partial<StreakState>;
          if (typeof p.last === "string" && typeof p.count === "number") {
            return { last: p.last, count: p.count, best: typeof p.best === "number" ? p.best : p.count };
          }
        }
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return { last: "", count: 0, best: 0 };
}

function writeStored(s: StreakState) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
  } catch {
    /* ignore storage errors */
  }
}

/**
 * Consecutive days with a finished story. Call recordDay() when a story ends.
 */
export function useStreak() {
  const [streak, setStreak] = useState<StreakState>(readStored);

  const recordDay = useCallback(() => {
    setStreak((prev) => {
      const today = dayKey(new Date());
      if (prev.last === today) return prev;
      const y = new Date();
      y.setDate(y.getDate() - 1);
      const continued = prev.last === dayKey(y);
      const count = continued ? prev.count + 1 : 1;
      const next = { last: today, count, best: Math.max(prev.best, count) };
      writeStored(next);
      return next;
    });
  }, []);

  return { streak, recordDay };
}
