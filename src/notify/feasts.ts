import { Platform } from "react-native";
import { feastDays, MONTH_NAMES } from "../data/feastDays";

const PREF_KEY = "saintventures:notify-feasts";
const LAST_KEY = "saintventures:notify-feasts-last";
const DAILY_ID = "feast-today";

export type FeastToday = { month: number; day: number; saints: string[] };

/** Feast days falling on the current device date, grouped by day. */
export function todayFeasts(): FeastToday[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const groups = new Map<number, string[]>();
  for (const f of feastDays) {
    if (f.month === month && f.day === day) {
      const list = groups.get(f.day) ?? [];
      list.push(f.story.saint);
      groups.set(f.day, list);
    }
  }
  return [...groups.entries()].map(([d, saints]) => ({ month, day: d, saints }));
}

export function feastLine(): string {
  const list = todayFeasts();
  if (list.length === 0) return "";
  const parts = list.map(
    (f) => `${f.saints.join(", ")} (${f.day} ${MONTH_NAMES[f.month - 1]})`
  );
  return parts.join("; ");
}

export function getFeastNotifyPref(): boolean {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(PREF_KEY);
      if (raw === null) return true; // default ON
      return raw === "1";
    }
  } catch {
    /* ignore storage errors */
  }
  return true;
}

export function setFeastNotifyPref(on: boolean) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(PREF_KEY, on ? "1" : "0");
    }
  } catch {
    /* ignore storage errors */
  }
}

async function nativeModule(): Promise<any | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("expo-notifications");
  } catch {
    return null;
  }
}

/** Browser permission state for UI feedback: granted | denied | default | unsupported. */
export function webNotifyState(): string {
  try {
    if (Platform.OS !== "web" || typeof Notification === "undefined") return "unsupported";
    return Notification.permission;
  } catch {
    return "unsupported";
  }
}
export async function checkFeastPermission(): Promise<boolean> {
  if (Platform.OS === "web") {
    try {
      if (typeof Notification === "undefined") return false;
      return Notification.permission === "granted";
    } catch {
      return false;
    }
  }
  const N = await nativeModule();
  if (!N) return false;
  try {
    const cur = await N.getPermissionsAsync();
    return !!cur.granted;
  } catch {
    return false;
  }
}

/** Ensure permission, prompting if needed (for the toggle). */
export async function ensureFeastPermission(): Promise<boolean> {
  if (Platform.OS === "web") {
    try {
      if (typeof Notification === "undefined") return false;
      if (Notification.permission === "granted") return true;
      if (Notification.permission === "denied") return false;
      return (await Notification.requestPermission()) === "granted";
    } catch {
      return false;
    }
  }
  const N = await nativeModule();
  if (!N) return false;
  try {
    const cur = await N.getPermissionsAsync();
    if (cur.granted) return true;
    const req = await N.requestPermissionsAsync();
    return !!req.granted;
  } catch {
    return false;
  }
}

/**
 * Schedule today's feast reminder. One-shot per day (refreshed on each app
 * start) so the content never goes stale.
 */
export async function scheduleFeastNotifications(): Promise<void> {
  const line = feastLine();
  if (Platform.OS === "web") {
    if (line) await showImmediate("Today's feast day", line);
    return;
  }
  const N = await nativeModule();
  if (!N) return;
  try {
    try {
      N.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    } catch {
      /* optional */
    }
    try {
      await N.cancelScheduledNotificationAsync(DAILY_ID);
    } catch {
      /* none scheduled */
    }
    if (!line) return;
    const at = new Date();
    at.setHours(8, 0, 0, 0);
    if (at.getTime() <= Date.now()) return; // today's slot passed; spotlight covers it
    await N.scheduleNotificationAsync({
      identifier: DAILY_ID,
      content: { title: "Today's feast day", body: line },
      trigger: { type: N.SchedulableTriggerInputTypes.DAILY, hour: 8, minute: 0 },
    });
  } catch {
    /* notifications unavailable */
  }
}

export async function cancelFeastNotifications(): Promise<void> {
  if (Platform.OS === "web") return;
  const N = await nativeModule();
  if (!N) return;
  try {
    await N.cancelScheduledNotificationAsync(DAILY_ID);
  } catch {
    /* ignore */
  }
}

let webShownThisSession = false;

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function readLastShown(): string {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      return localStorage.getItem(LAST_KEY) ?? "";
    }
  } catch {
    /* ignore storage errors */
  }
  return webShownThisSession ? todayKey() : "";
}

function writeLastShown() {
  webShownThisSession = true;
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(LAST_KEY, todayKey());
    }
  } catch {
    /* ignore storage errors */
  }
}

/** Show one notification right now (no guards — the caller decides). */
async function showImmediate(title: string, body: string): Promise<boolean> {
  if (Platform.OS === "web") {
    try {
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return false;
      // Unique tag every time: reusing a tag silently replaces without alerting.
      new Notification(title, { body, tag: `${DAILY_ID}-${Date.now()}` });
      return true;
    } catch {
      return false;
    }
  }
  const N = await nativeModule();
  if (!N) return false;
  try {
    await N.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Toggle path: always confirm immediately so the switch feels alive,
 * then schedule today's slot. Stamps the day to keep the launch path quiet.
 */
export async function confirmFeastNotifications(): Promise<void> {
  try {
    const line = feastLine();
    if (line) {
      await showImmediate("Today's feast day", line);
    } else {
      await showImmediate("Feast day reminders are on", "We'll let you know when saints celebrate.");
    }
    writeLastShown();
    await scheduleFeastNotifications();
  } catch {
    /* ignore */
  }
}

/**
 * App-start refresh: at most once per day, and on web only when there is
 * actually a feast to announce. Native relies on the scheduled slot.
 */
export async function refreshFeastNotifications(): Promise<void> {
  try {
    if (!getFeastNotifyPref()) return;
    if (readLastShown() === todayKey()) return;
    if (!(await checkFeastPermission())) return;
    if (Platform.OS === "web") {
      const line = feastLine();
      if (!line) return;
      if (await showImmediate("Today's feast day", line)) writeLastShown();
      return;
    }
    await scheduleFeastNotifications();
  } catch {
    /* ignore */
  }
}
