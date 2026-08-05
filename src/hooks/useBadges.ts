import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:badges";

function load(): Record<string, number> {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Record<string, number>;
    }
  } catch {
    /* ignore storage errors */
  }
  return {};
}

export function useBadges() {
  const [badges, setBadges] = useState<Record<string, number>>(load);

  const has = useCallback((id: string): boolean => Boolean(badges[id]), [badges]);

  const count = useCallback((): number => Object.keys(badges).length, [badges]);

  const list = useCallback(
    (): Array<{ id: string; earnedAt: number }> =>
      Object.entries(badges)
        .map(([id, earnedAt]) => ({ id, earnedAt }))
        .sort((a, b) => b.earnedAt - a.earnedAt),
    [badges]
  );

  const earn = useCallback((id: string) => {
    setBadges((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: Date.now() };
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

  return { has, count, list, earn };
}
