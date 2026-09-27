import { stories, type Story } from "./stories";

export type FeastDay = {
  story: Story;
  month: number; // 1-12
  day: number;
};

// Real feast dates (General Roman Calendar) for the saints currently in
// our story library. Add an entry here whenever a new story is added.
const FEAST_DATES: Record<string, { month: number; day: number }> = {
  "st-anthony": { month: 6, day: 13 },
  "st-joan": { month: 5, day: 30 },
  "st-clare": { month: 8, day: 11 },
  "st-pio": { month: 9, day: 23 },
  "st-francis": { month: 10, day: 4 },
  "st-therese": { month: 10, day: 1 },
  "st-jude": { month: 10, day: 28 },
  "st-john-baptist": { month: 6, day: 24 },
  "st-mary-magdalene": { month: 7, day: 22 },
  "st-fulgentius": { month: 1, day: 1 },
  "st-macarius": { month: 1, day: 2 },
  "st-genevieve": { month: 1, day: 3 },
  "st-mariam": { month: 8, day: 26 },
  "st-christina": { month: 7, day: 24 },
  "st-mary-mackillop": { month: 8, day: 8 },
  "st-carlo-acutis": { month: 10, day: 12 },
  "st-peter": { month: 6, day: 29 },
  "st-andrew": { month: 11, day: 30 },
  "st-james-greater": { month: 7, day: 25 },
  "st-john": { month: 12, day: 27 },
  "st-philip": { month: 5, day: 3 },
  "st-bartholomew": { month: 8, day: 24 },
  "st-thomas": { month: 7, day: 3 },
  "st-matthew": { month: 9, day: 21 },
  "st-james-less": { month: 5, day: 3 },
  "st-simon-zealot": { month: 10, day: 28 },
  "st-matthias": { month: 5, day: 14 },
  "st-mark": { month: 4, day: 25 },
  "st-luke": { month: 10, day: 18 },
  "st-theresa-calcutta": { month: 9, day: 5 },
  "st-maria-goretti": { month: 7, day: 6 },
  "st-augustine": { month: 8, day: 28 },
  "st-monica": { month: 8, day: 27 },
  "st-josephine-bakhita": { month: 2, day: 8 },
  "st-vincent-de-paul": { month: 9, day: 27 },
  "st-augustine-zhao-rong": { month: 7, day: 9 },
  "st-lawrence-ruiz": { month: 9, day: 28 },
  "st-michael-archangel": { month: 9, day: 29 },
  "st-gabriel-archangel": { month: 9, day: 29 },
  "st-raphael-archangel": { month: 9, day: 29 },
  "st-john-paul-ii": { month: 10, day: 22 },
  "st-gregory-the-great": { month: 9, day: 3 },
  "st-bernadette": { month: 4, day: 16 },
  "st-faustina": { month: 10, day: 5 },
  "st-jerome": { month: 9, day: 30 },
  "st-maximilian-kolbe": { month: 8, day: 14 },
};

export const feastDays: FeastDay[] = stories
  .filter((s) => FEAST_DATES[s.id])
  .map((s) => ({ story: s, ...FEAST_DATES[s.id] }));

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function sortFeastDays(
  days: FeastDay[],
  direction: "asc" | "desc"
): FeastDay[] {
  const sorted = [...days].sort(
    (a, b) => a.month - b.month || a.day - b.day
  );
  return direction === "asc" ? sorted : sorted.reverse();
}
