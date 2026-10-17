import { Platform } from "react-native";
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

export type MusicTrack = { id: string; title: string; file: number };

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: "story-music", title: "Gentle Dawn", file: require("../../assets/audio/story-music.mp3") },
  { id: "story-music2", title: "Peaceful Chapel", file: require("../../assets/audio/story-music2.mp3") },
  { id: "story-music3", title: "Angel's Lullaby", file: require("../../assets/audio/story-music3.mp3") },
  { id: "story-music4", title: "Quiet Waters", file: require("../../assets/audio/story-music4.mp3") },
  { id: "story-music5", title: "Morning Light", file: require("../../assets/audio/story-music5.mp3") },
  { id: "story-music6", title: "Holy Rest", file: require("../../assets/audio/story-music6.mp3") },
];

const BADGE_MESSAGE = require("../../assets/audio/Badge Achievement Congratulatory Message.mp3");

const VOLUME_KEY = "saintventures:music-volume";
const TRACK_KEY = "saintventures:music-track";
const MASTER_KEY = "saintventures:master-mute";
const QUIZ_VOICE_KEY = "saintventures:quiz-voiceover";
const VOLUME_MAX = 0.5; // music stays a soft bed under the narration
const DEFAULT_LEVEL = 3; // turned down two notches from the original 5

let player: AudioPlayer | null = null;
let badgePlayer: AudioPlayer | null = null;
let modeApplied = false;
let muted = false;

function readStored(key: string): string | null {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

function writeStored(key: string, value: string) {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  } catch {
    // ignore storage errors
  }
}

function readStoredLevel(): number {
  const n = parseInt(readStored(VOLUME_KEY) ?? "", 10);
  if (Number.isFinite(n)) return Math.min(10, Math.max(0, n));
  return DEFAULT_LEVEL;
}

function readStoredTrack(): string {
  const id = readStored(TRACK_KEY);
  if (id && MUSIC_TRACKS.some((t) => t.id === id)) return id;
  return MUSIC_TRACKS[0].id;
}

function readStoredFlag(key: string, fallback: boolean): boolean {
  const raw = readStored(key);
  if (raw === null) return fallback;
  return raw === "1";
}

let level = readStoredLevel();
let trackId = readStoredTrack();
let masterMuted = readStoredFlag(MASTER_KEY, false);
let quizVoiceover = readStoredFlag(QUIZ_VOICE_KEY, true);

function currentTrack(): MusicTrack {
  return MUSIC_TRACKS.find((t) => t.id === trackId) ?? MUSIC_TRACKS[0];
}

function playerVolume(): number {
  if (muted || masterMuted) return 0;
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
  writeStored(VOLUME_KEY, String(level));
  applyVolume();
}

export function getStoryMusicTrack(): string {
  return trackId;
}

export function setStoryMusicTrack(id: string) {
  if (!MUSIC_TRACKS.some((t) => t.id === id)) return;
  trackId = id;
  writeStored(TRACK_KEY, id);
  // Recreate lazily so the next story starts on the new track.
  releaseStoryMusic();
}

export function setStoryMusicMuted(m: boolean) {
  muted = m;
  applyVolume();
}

export function isStoryMusicMuted() {
  return muted;
}

export function isMasterMuted() {
  return masterMuted;
}

export function setMasterMuted(m: boolean) {
  masterMuted = m;
  writeStored(MASTER_KEY, m ? "1" : "0");
  if (m) {
    try {
      player?.pause();
    } catch {
      // ignore
    }
  }
  applyVolume();
}

export function isQuizVoiceoverOn() {
  return quizVoiceover;
}

export function setQuizVoiceover(on: boolean) {
  quizVoiceover = on;
  writeStored(QUIZ_VOICE_KEY, on ? "1" : "0");
}

function ensureAudioMode() {
  if (modeApplied) return;
  modeApplied = true;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
}

function getPlayer(): AudioPlayer | null {
  try {
    if (!player) {
      player = createAudioPlayer(currentTrack().file);
      player.loop = true;
      player.volume = playerVolume();
    }
    return player;
  } catch {
    return null;
  }
}

export function startStoryMusic() {
  if (muted || masterMuted) return;
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
  if (muted || masterMuted) return;
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

/** Plays the congratulatory voiceover when a quiz is finished. */
export function playBadgeMessage() {
  if (masterMuted || !quizVoiceover) return;
  try {
    if (!badgePlayer) {
      badgePlayer = createAudioPlayer(BADGE_MESSAGE);
      badgePlayer.volume = 1;
    }
    ensureAudioMode();
    const result = badgePlayer.play() as unknown;
    if (result && typeof (result as Promise<void>).catch === "function") {
      (result as Promise<void>).catch(() => {});
    }
  } catch {
    // ignore
  }
}
