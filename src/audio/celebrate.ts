import { Platform } from "react-native";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { speakWithBestVoice } from "./voice";
import { isMasterMuted } from "./backgroundMusic";

const TRY_AGAIN_AUDIO = require("../../assets/audio/Try again.mp3");
let tryPlayer: AudioPlayer | null = null;

export function playCelebrationSound() {
  if (isMasterMuted()) return;
  if (
    Platform.OS === "web" &&
    typeof window !== "undefined" &&
    (window as any).AudioContext
  ) {
    try {
      const Ctx: typeof AudioContext =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        const t0 = now + i * 0.09;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.65);
      });
      setTimeout(() => ctx.close().catch(() => {}), 1500);
      return;
    } catch {
      /* fall through to speech */
    }
  }
  speakWithBestVoice("Yay!", { rate: 1.1, pitch: 1.4 });
}

export function sayTryAgain() {
  if (isMasterMuted()) return;
  try {
    // Recreate each time so the clip always restarts from the beginning.
    tryPlayer?.remove();
    tryPlayer = createAudioPlayer(TRY_AGAIN_AUDIO);
    tryPlayer.volume = 1;
    const result = tryPlayer.play() as unknown;
    if (result && typeof (result as Promise<void>).catch === "function") {
      (result as Promise<void>).catch(() => {});
    }
  } catch {
    speakWithBestVoice("Try again", { rate: 0.8, pitch: 1.05 });
  }
}

export function stopTryAgainSound() {
  try {
    tryPlayer?.remove();
    tryPlayer = null;
  } catch {
    // ignore
  }
}
