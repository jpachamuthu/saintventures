import { Platform } from "react-native";
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

const STORY_MUSIC = require("../../assets/audio/story-music.mp3");

const VOLUME_KEY = "saintventures:music-volume";
const VOLUME_MAX = 0.5; // music stays a soft bed under the narration
const DEFAULT_LEVEL = 3; // turned down two notches from the original 5

let player: AudioPlayer | null = null;
let modeApplied = false;
let muted = false;

function readStoredLevel(): number {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const n = parseInt(localStorage.getItem(VOLUME_KEY) ?? "", 10);
      if (Number.isFinite(n)) return Math.min(10, Math.max(0, n));
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_LEVEL;
}

let level = readStoredLevel();

function playerVolume(): number {
  if (muted) return 0;
  return (level / 10) * VOLUME_MAX;
}

function applyVolume() {
  try {
    if (player) player.volume = playerVolume();
  } catch {
    // ignore
  }
}

export function getStoryMusicVolume(): number {
  return level;
}

export function setStoryMusicVolume(next: number) {
  level = Math.min(10, Math.max(0, Math.round(next)));
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(VOLUME_KEY, String(level));
    }
  } catch {
    // ignore storage errors
  }
  applyVolume();
}

export function setStoryMusicMuted(m: boolean) {
  muted = m;
  applyVolume();
}

export function isStoryMusicMuted() {
  return muted;
}

function ensureAudioMode() {
  if (modeApplied) return;
  modeApplied = true;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
}

function getPlayer(): AudioPlayer | null {
  try {
    if (!player) {
      player = createAudioPlayer(STORY_MUSIC);
      player.loop = true;
      player.volume = playerVolume();
    }
    return player;
  } catch {
    return null;
  }
}

export function startStoryMusic() {
  ensureAudioMode();
  const p = getPlayer();
  if (!p) return;
  try {
    const result = p.play() as unknown;
    if (result && typeof (result as Promise<void>).catch === "function") {
      (result as Promise<void>).catch(() => {});
    }
  } catch {
    // play may be blocked without a user gesture; ignore
  }
}

export function pauseStoryMusic() {
  try {
    player?.pause();
  } catch {
    // ignore
  }
}

export function resumeStoryMusic() {
  const p = player;
  if (!p || !p.paused) return;
  startStoryMusic();
}

export function stopStoryMusic() {
  try {
    player?.pause();
  } catch {
    // ignore
  }
}

export function releaseStoryMusic() {
  if (player) {
    try {
      player.remove();
    } catch {
      // ignore
    }
    player = null;
  }
}
