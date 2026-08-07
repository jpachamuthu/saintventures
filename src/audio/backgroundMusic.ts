import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

const STORY_MUSIC = require("../../assets/audio/story-music.wav");

const MUSIC_VOLUME = 0.25;

let player: AudioPlayer | null = null;
let modeApplied = false;

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
      player.volume = MUSIC_VOLUME;
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
