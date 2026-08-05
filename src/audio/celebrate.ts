import { Platform } from "react-native";
import * as Speech from "expo-speech";

export function playCelebrationSound() {
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
  Speech.speak("Yay!", { language: "en", rate: 1.1, pitch: 1.4 });
}

export function sayTryAgain() {
  Speech.speak("Try again", { language: "en", rate: 0.8, pitch: 1.05 });
}
