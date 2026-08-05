import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:ratings";

type StoryRating = { sum: number; count: number };
type RatingStore = Record<string, StoryRating>;

function loadStore(): RatingStore {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as RatingStore;
    }
  } catch {
    /* ignore storage errors */
  }
  return {};
}

export function formatRating(x: number): string {
  if (!x || x <= 0) return "3+";
  return `${Math.floor(x)}+`;
}

export function useRatings() {
  const [store, setStore] = useState<RatingStore>(loadStore);

  const average = useCallback(
    (id: string): number => {
      const r = store[id];
      return r ? r.sum / r.count : 0;
    },
    [store]
  );

  const rate = useCallback((id: string, stars: number) => {
    setStore((prev) => {
      const r = prev[id] ?? { sum: 0, count: 0 };
      const next: RatingStore = {
        ...prev,
        [id]: { sum: r.sum + stars, count: r.count + 1 },
      };
      try {
        if (Platform.OS === "web" && typeof localStorage !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
  }, []);

  return { average, rate };
}
