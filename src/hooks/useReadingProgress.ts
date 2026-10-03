import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:reading-progress";

export type ProgressEntry = { page: number; finished: boolean };
export type ProgressMap = Record<string, ProgressEntry>;

function readStored(): ProgressMap {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw as string) as unknown;
        if (parsed && typeof parsed === "object") return parsed as ProgressMap;
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return {};
}

function writeStored(map: ProgressMap) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }
  } catch {
    /* ignore storage errors */
  }
}

/**
 * Per-story reading position + completion, persisted to localStorage on web.
 * Powers "continue reading" and the up-next picker.
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState<ProgressMap>(readStored);

  const savePage = useCallback((id: string, page: number) => {
    setProgress((prev) => {
      const cur = prev[id];
      if (cur?.finished) return prev;
      if (cur && cur.page === page) return prev;
      const next = { ...prev, [id]: { page, finished: false } };
      writeStored(next);
      return next;
    });
  }, []);

  const markFinished = useCallback((id: string, page: number) => {
    setProgress((prev) => {
      const next = { ...prev, [id]: { page, finished: true } };
      writeStored(next);
      return next;
    });
  }, []);

  return { progress, savePage, markFinished };
}
