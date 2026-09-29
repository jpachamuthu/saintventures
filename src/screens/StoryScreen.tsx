import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, Pause, Play, RotateCcw, RotateCw, Settings, Star, Volume2, VolumeX } from "lucide-react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import SaintIllustration from "../components/SaintIllustration";
import GlassView from "../components/GlassView";
import GoldGradient from "../components/GoldGradient";
import { useTheme } from "../components/ThemeContext";
import { useRatings } from "../hooks/useRatings";
import { getBestVoice } from "../audio/voice";
import { startStoryMusic, pauseStoryMusic, resumeStoryMusic, stopStoryMusic, releaseStoryMusic, setStoryMusicMuted } from "../audio/backgroundMusic";
import { fonts, radius, type ThemeColors } from "../theme";
import type { Story } from "../data/stories";

type StoryScreenProps = {
  story: Story;
  onBack: () => void;
  onStartQuiz: () => void;
};

const RATE = 0.98;
const PITCH = 1.0;
const PAGE_END_PAD_MS = 900;
const BOUNDARY_GRACE_MS = 800;
const BASE_WORD_MS = 120;
const CHAR_MS = 55;
const WORD_GAP_MS = 70;
const SENTENCE_END_MS = 360;
// Flip to true to bring the mute button back to the story dock.
const SHOW_MUTE_BUTTON = false;const PHRASE_PAUSE_MS = 200;
const CALIB_SMOOTH = 0.5;

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/);
}

// TTS engines spell out ALL-CAPS words letter by letter ("NO" -> "N-O").
// Lowercase them for speech only — display text is untouched, and because
// lowercasing never changes string length, boundary/highlight timing still lines up.
// Roman numerals (II, XI, …) are left alone: they already read correctly.
const ROMAN = new Set([
  "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XX",
]);

function spokenText(text: string): string {
  return text.replace(/\b[A-Z]{2,}\b/g, (w) => (ROMAN.has(w) ? w : w.toLowerCase()));
}

function wordDurationMs(word: string): number {
  const letters = word.replace(/[^A-Za-z0-9'-]/g, "");
  let ms = BASE_WORD_MS + Math.max(0, letters.length - 1) * CHAR_MS;
  if (/[.!?]/.test(word)) ms += SENTENCE_END_MS;
  else if (/[,;:]/.test(word)) ms += PHRASE_PAUSE_MS;
  return ms;
}

function buildDurations(words: string[], calib = 1): number[] {
  const out: number[] = [];
  let acc = 0;
  for (const w of words) {
    acc += (wordDurationMs(w) + WORD_GAP_MS) * calib;
    out.push(acc);
  }
  return out;
}

function buildWordOffsets(text: string): number[] {
  const offsets: number[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) offsets.push(m.index);
  return offsets;
}

function wordIndexFromChar(charIndex: number, offsets: number[]): number {
  for (let i = 0; i < offsets.length; i++) {
    if (charIndex <= offsets[i]) return Math.max(0, i - (offsets[i] === charIndex ? 0 : 1));
  }
  return offsets.length - 1;
}

export default function StoryScreen({ story, onBack, onStartQuiz }: StoryScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const [page, setPage] = useState(0);
  const [reading, setReading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [voice, setVoice] = useState<string | undefined>(undefined);
  const [showEnd, setShowEnd] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [muted, setMuted] = useState(false);

  const pageRef = useRef(0);
  const readingRef = useRef(false);
  const durationsRef = useRef<number[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const calibRef = useRef(1);
  const speechStartRef = useRef(0);
  const consumedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);
  const advancedRef = useRef(false);
  const boundaryModeRef = useRef(false);
  const sessionRef = useRef(0);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endOpacity = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const wordYRef = useRef<number[]>([]);
  const textYRef = useRef(0);
  const scrollYRef = useRef(0);
  const viewHRef = useRef(0);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { rate } = useRatings();

  const total = story.pages.length;
  const pct = Math.round(((page + 1) / total) * 100);
  const firstChar = story.pages[page].charAt(0);
  const rest = story.pages[page].slice(1);

  const words = useMemo(() => splitWords(rest), [rest]);

  // Reset word positions and jump back to the top whenever the page changes.
  useEffect(() => {
    wordYRef.current = [];
    scrollYRef.current = 0;
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [page]);

  // Follow the narrated word, but only step in when it is about to slide
  // under the floating dock — one decisive glide per screenful, no jitter.
  // DOCK_CLEAR must cover the dock height (~95) plus breathing room.
  const DOCK_CLEAR = 120;
  useEffect(() => {
    if (!reading || activeWord == null) return;
    const wy = wordYRef.current[activeWord];
    if (wy == null) return;
    const contentY = textYRef.current + wy;
    const bottomEdge = scrollYRef.current + (viewHRef.current || 600);
    if (contentY + 34 > bottomEdge - DOCK_CLEAR) {
      scrollRef.current?.scrollTo({ y: Math.max(0, contentY - 140), animated: true });
    }
  }, [activeWord, reading]);

  useEffect(() => {
    let mounted = true;
    getBestVoice()
      .then((v) => {
        if (mounted && v) setVoice(v);
      })
      .catch(() => {});
    return () => {
      mounted = false;
      clearTimers();
      Speech.stop();
      stopStoryMusic();
      releaseStoryMusic();
      if (endTimerRef.current) {
        clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
    };
  }, []);

  function clearTimers() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }

  function stopReading() {
    sessionRef.current += 1;
    cancelledRef.current = true;
    readingRef.current = false;
    clearTimers();
    Speech.stop();
    stopStoryMusic();
    setReading(false);
    setPaused(false);
    setActiveWord(null);
  }

  function startEstimateInterval() {
    clearTimers();
    intervalRef.current = setInterval(() => {
      if (boundaryModeRef.current || !readingRef.current) return;
      const elapsed = consumedRef.current + (Date.now() - speechStartRef.current);
      const dur = durationsRef.current;
      const totalMs = dur.length ? dur[dur.length - 1] : 0;

      let idx = 0;
      while (idx < dur.length && elapsed > dur[idx]) idx += 1;
      if (idx >= dur.length) idx = dur.length - 1;
      if (idx >= 0) setActiveWord(idx);

      if (elapsed >= totalMs + PAGE_END_PAD_MS) {
        clearTimers();
        advancePage();
      }
    }, 80);
  }

  function calibrateFromActual() {
    const dur = durationsRef.current;
    if (!dur.length) return;
    const estMs = dur[dur.length - 1];
    const actualMs = Date.now() - speechStartRef.current;
    if (estMs > 200 && actualMs > 400) {
      const ratio = actualMs / estMs;
      calibRef.current = calibRef.current * (1 - CALIB_SMOOTH) + ratio * CALIB_SMOOTH;
    }
  }

  function startPage(p: number) {
    const session = ++sessionRef.current;
    pageRef.current = p;
    boundaryModeRef.current = false;
    offsetsRef.current = buildWordOffsets(story.pages[p]);
    durationsRef.current = buildDurations(splitWords(story.pages[p]), calibRef.current);
    advancedRef.current = false;
    cancelledRef.current = false;
    speechStartRef.current = Date.now();
    consumedRef.current = 0;

    Speech.speak(spokenText(story.pages[p]), {
      language: "en",
      voice,
      rate: RATE,
      pitch: PITCH,
      onBoundary: (ev: any) => {
        if (session !== sessionRef.current) return;
        if (ev && typeof ev.charIndex === "number" && (ev.name === undefined || ev.name === "word")) {
          boundaryModeRef.current = true;
          setActiveWord(wordIndexFromChar(ev.charIndex, offsetsRef.current));
        }
      },
      onDone: () => {
        if (session !== sessionRef.current) return;
        if (!cancelledRef.current) {
          calibrateFromActual();
          advancePage();
        }
      },
      onStopped: () => {
        if (session !== sessionRef.current) return;
        if (cancelledRef.current) return;
      },
      onError: () => {
        if (session !== sessionRef.current) return;
        if (cancelledRef.current) return;
        advancePage();
      },
    });

    fallbackTimerRef.current = setTimeout(() => {
      if (session !== sessionRef.current) return;
      if (!boundaryModeRef.current && readingRef.current) startEstimateInterval();
    }, BOUNDARY_GRACE_MS);

    // Web-only TTS keepalive: Chromium can stall long utterances (~15s) without
    // firing onDone; resume() is a no-op while speech is actively playing.
    if (Platform.OS === "web") {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      keepAliveRef.current = setInterval(() => {
        if (readingRef.current && session === sessionRef.current) {
          try {
            Speech.resume();
          } catch {
            // ignore
          }
        }
      }, 10000);
    }
  }

  function advancePage() {
    if (advancedRef.current) return;
    advancedRef.current = true;
    clearTimers();
    const next = pageRef.current + 1;
    if (next < total) {
      setPage(next);
      startPage(next);
    } else {
      finishStory(1000);
    }
  }

  function showEndPanel() {
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
    setMyRating(0);
    setShowEnd(true);
    endOpacity.setValue(0);
    Animated.timing(endOpacity, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }

  function finishStory(delayMs = 1000) {
    sessionRef.current += 1;
    cancelledRef.current = true;
    readingRef.current = false;
    clearTimers();
    Speech.stop();
    setActiveWord(null);
    setReading(false);
    setPaused(false);
    stopStoryMusic();
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
    endTimerRef.current = setTimeout(() => {
      endTimerRef.current = null;
      showEndPanel();
    }, delayMs);
  }

  function startReading() {
    clearMute();
    readingRef.current = true;
    setReading(true);
    setPaused(false);
    startStoryMusic();
    startPage(pageRef.current);
  }

  function togglePause() {
    if (paused) {
      consumedRef.current += Date.now() - speechStartRef.current;
      speechStartRef.current = Date.now();
      Speech.resume();
      if (!boundaryModeRef.current) startEstimateInterval();
      resumeStoryMusic();
      setPaused(false);
    } else {
      consumedRef.current += Date.now() - speechStartRef.current;
      clearTimers();
      Speech.pause();
      pauseStoryMusic();
      setPaused(true);
    }
  }

  // True when muting interrupted active narration, so unmuting can resume it.
  const muteResumeRef = useRef(false);

  // TTS has no volume knob, so muting the voiceover means halting speech.
  // Music is silenced via player volume in the same gesture.
  function clearMute() {
    if (!muted) return;
    setMuted(false);
    setStoryMusicMuted(false);
    muteResumeRef.current = false;
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    setStoryMusicMuted(next);
    if (next) {
      // Mute: halt the voiceover (page position is kept) and silence music.
      muteResumeRef.current = readingRef.current;
      if (readingRef.current) stopReading();
    } else if (muteResumeRef.current) {
      // Unmute: resume narration from the top of the current page.
      muteResumeRef.current = false;
      startReading();
    }
  }

  function goNext() {
    if (page + 1 >= total) {
      finishStory(1000);
      return;
    }
    const wasReading = reading;
    if (reading) stopReading();
    const next = page + 1;
    setPage(next);
    pageRef.current = next;
    if (wasReading) {
      setReading(true);
      setPaused(false);
      startStoryMusic();
      startPage(next);
    }
  }

  function goPrev() {
    if (page === 0) {
      if (reading) stopReading();
      return;
    }
    const wasReading = reading;
    if (reading) stopReading();
    const prev = page - 1;
    setPage(prev);
    pageRef.current = prev;
    if (wasReading) {
      setReading(true);
      setPaused(false);
      startStoryMusic();
      startPage(prev);
    }
  }

  function handleBack() {
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
    stopReading();
    onBack();
  }

  function replay() {
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
    clearMute();
    setShowEnd(false);
    setMyRating(0);
    setPage(0);
    pageRef.current = 0;
    setReading(true);
    setPaused(false);
    startStoryMusic();
    startPage(0);
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.headerBtn} hitSlop={8}>
          <ArrowLeft size={18} color={colors.cream} />
        </Pressable>
        <Text style={styles.headerTitle}>{story.title}</Text>
        <Pressable style={styles.headerBtn} hitSlop={8}>
          <Settings size={17} color={colors.cream} />
        </Pressable>
      </View>

      <View style={styles.artWrap}>
        <SaintIllustration palette={story.palette} art={story.art} image={story.hero} height={240} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollYRef.current = e.nativeEvent.contentOffset.y;
        }}
        onLayout={(e) => {
          viewHRef.current = e.nativeEvent.layout.height;
        }}
      >
        <View style={styles.pageLabelRow}>
          <Text style={styles.pageLabel}>
            Page {page + 1} of {total}
          </Text>
          {reading && (
            <View style={styles.listeningPill}>
              <View style={[styles.listeningDot, paused && styles.listeningDotPaused]} />
              <Text style={styles.listeningText}>{paused ? "Paused" : "Reading aloud"}</Text>
            </View>
          )}
        </View>
        <Text
          style={styles.pageText}
          onLayout={(e) => {
            textYRef.current = e.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.dropCap}>{firstChar}</Text>
          {words.map((w, i) => (
            <Text
              key={`${i}-${w}`}
              onLayout={(e) => {
                wordYRef.current[i] = e.nativeEvent.layout.y;
              }}
              style={[i === activeWord && reading ? styles.activeWord : null, paused && i === activeWord && styles.activeWordPaused]}
            >
              {w}{" "}
            </Text>
          ))}
        </Text>
      </ScrollView>

      <View style={[styles.dockWrap, { bottom: Math.max(insets.bottom, 4) }]}>
        <GlassView strong deep corner={26} style={styles.dock}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${pct}%` }]} />
          </View>
          <View style={styles.controls}>
            <Pressable
              onPress={goPrev}
              style={{ opacity: page === 0 && !reading ? 0.35 : 1 }}
              hitSlop={8}
            >
              <RotateCcw size={22} color={colors.cream} />
            </Pressable>
            <Pressable style={styles.playBtn} onPress={reading ? togglePause : startReading} hitSlop={8}>
              <GoldGradient style={StyleSheet.absoluteFill} />
              {reading ? (
                paused ? (
                  <Play size={22} color="#000000" fill="#000000" style={{ marginLeft: 3, zIndex: 1 }} />
                ) : (
                  <Pause size={22} color="#000000" fill="#000000" style={{ zIndex: 1 }} />
                )
              ) : (
                <Play size={22} color="#000000" fill="#000000" style={{ marginLeft: 3, zIndex: 1 }} />
              )}
            </Pressable>
            <Pressable onPress={goNext} hitSlop={8}>
              <RotateCw size={22} color={colors.cream} />
            </Pressable>
            {SHOW_MUTE_BUTTON && (
              <Pressable
                onPress={toggleMute}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={muted ? "Unmute background music" : "Mute background music"}
              >
                {muted ? (
                  <VolumeX size={22} color={colors.cream} />
                ) : (
                  <Volume2 size={22} color={colors.cream} />
                )}
              </Pressable>
            )}
          </View>
        </GlassView>
      </View>

      {showEnd && (
        <Animated.View style={[styles.endOverlay, { opacity: endOpacity }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowEnd(false)}
            accessibilityRole="button"
            accessibilityLabel="Close rating panel"
          />
          <View style={styles.endPanel}>
            <Text style={styles.endTitle}>The end</Text>
            <Text style={styles.endSub}>{story.title}</Text>
            <View style={styles.endStars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable
                  key={n}
                  hitSlop={6}
                  onPress={() => {
                    if (myRating === 0) {
                      setMyRating(n);
                      rate(story.id, n);
                    }
                  }}
                >
                  <Star
                    size={30}
                    color={n <= myRating ? colors.gold : colors.ring}
                    fill={n <= myRating ? colors.gold : "transparent"}
                  />
                </Pressable>
              ))}
            </View>
            <Text style={styles.endHint}>
              {myRating === 0 ? "Rate this story" : `You rated it ${myRating} stars`}
            </Text>
            <Pressable style={styles.replayBtn} onPress={replay}>
              <GoldGradient style={StyleSheet.absoluteFill} />
              <RotateCcw size={18} color={colors.onGold} style={{ zIndex: 1 }} />
              <Text style={styles.replayLabel}>Replay</Text>
            </Pressable>
            <Pressable style={styles.quizBtn} onPress={onStartQuiz}>
              <Play size={16} color={colors.gold} fill={colors.gold} />
              <Text style={styles.quizLabel}>Start quiz</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgCard,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: colors.cream,
    flexShrink: 1,
    textAlign: "center",
  },
  artWrap: {
    paddingHorizontal: 18,
  },
  body: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 130,
  },
  pageLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pageLabel: {
    fontFamily: fonts.uiBold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.gold,
    textTransform: "uppercase",
  },
  listeningPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.ring,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  listeningDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
  listeningDotPaused: {
    backgroundColor: colors.mutedDim,
  },
  listeningText: {
    fontFamily: fonts.uiBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.cream,
    textTransform: "uppercase",
  },
  pageText: {
    fontFamily: fonts.ui,
    fontSize: 22,
    lineHeight: 34,
    color: colors.cream,
  },
  dropCap: {
    fontFamily: fonts.displayBold,
    fontSize: 40,
    lineHeight: 40,
    color: colors.gold,
  },
  activeWord: {
    color: colors.goldBright,
    backgroundColor: "rgba(212, 158, 66, 0.16)",
    borderRadius: 4,
  },
  activeWordPaused: {
    color: colors.gold,
    backgroundColor: "rgba(212, 158, 66, 0.10)",
  },
  dockWrap: {
    position: "absolute",
    left: 12,
    right: 12,
  },
  dock: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  track: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.ring,
    overflow: "hidden",
    marginBottom: 10,
  },
  fill: {
    height: 3,
    backgroundColor: colors.gold,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 26,
    paddingVertical: 2,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  endOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 8, 18, 0.55)",
    justifyContent: "flex-end",
  },
  endPanel: {
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  endTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    color: colors.cream,
  },
  endSub: {
    fontFamily: fonts.ui,
    fontSize: 13,
    color: colors.mutedDim,
    marginTop: 2,
    marginBottom: 16,
  },
  endStars: {
    flexDirection: "row",
    gap: 12,
  },
  endHint: {
    fontFamily: fonts.ui,
    fontSize: 11,
    color: colors.mutedDim,
    marginTop: 8,
  },
  replayBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.pill,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 20,
    overflow: "hidden",
  },
  replayLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 17,
    color: colors.onGold,
  },
  quizBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.bgCardAlt,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 14,
  },
  quizLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: colors.gold,
  },
});
}
