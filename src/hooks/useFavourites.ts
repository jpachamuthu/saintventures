import { useCallback, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "saintventures:favourites";

function readStored(): string[] {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw as string) as unknown;
        if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === "string");
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
 * Favourite story ids, persisted to localStorage on web.
 * Works in-memory on native until a backend (e.g. Supabase) is wired up.
 */
export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>(readStored);

  const isFavourite = useCallback(
    (id: string) => favourites.includes(id),
    [favourites]
  );

  const toggleFavourite = useCallback((id: string) => {
    setFavourites((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      writeStored(next);
      return next;
    });
  }, []);

  return { favourites, isFavourite, toggleFavourite };
}