import { stories, type Story } from "./stories";
import { feastDays } from "./feastDays";
import type { ProgressMap } from "../hooks/useReadingProgress";

/**
 * Priority: oldest unfinished → today's feast saint → newest unseen → random.
 * Never returns the story just finished.
 */
export function pickUpNext(
  currentId: string,
  progress: ProgressMap,
  seenIds: string[]
): Story {
  const pool = stories.filter((s) => s.id !== currentId);

  const unfinished = pool
    .filter((s) => {
      const p = progress[s.id];
      return p && !p.finished;
    })
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  if (unfinished.length > 0) return unfinished[0];

  const now = new Date();
  const feast = feastDays.find(
    (f) =>
      f.month === now.getMonth() + 1 &&
      f.day === now.getDate() &&
      f.story.id !== currentId &&
      !progress[f.story.id]?.finished
  );
  if (feast) return feast.story;

  const unseen = pool
    .filter((s) => !seenIds.includes(s.id))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  if (unseen.length > 0) return unseen[0];

  return pool[Math.floor(Math.random() * pool.length)];
}
