import { useCallback, useState } from "react";
import { Platform } from "react-native";
import { stories } from "../data/stories";

const STORAGE_KEY = "saintventures:seen-stories";

function readStored(): string[] {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw as string) as unknown;
        if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === "string");
      } else {
        // First launch: everything currently bundled counts as seen, so the
        // bell only lights up for stories that arrive afterwards.
        return stories.map((s) => s.id);
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return [];
}

function writeStored(ids: string[]) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  } catch {
    /* ignore storage errors */
  }
}

/**
 * Story ids the reader has already seen, persisted to localStorage on web.
 * Drives the Home bell notification for newly arrived stories.
 */
export function useSeen() {
  const [seen, setSeen] = useState<string[]>(readStored);

  const markSeen = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeStored(next);
      return next;
    });
  }, []);

  const markAllSeen = useCallback((ids: string[]) => {
    setSeen((prev) => {
      const next = Array.from(new Set([...prev, ...ids]));
      writeStored(next);
      return next;
    });
  }, []);

  return { seen, markSeen, markAllSeen };
}
