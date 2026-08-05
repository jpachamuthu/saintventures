import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronDown, Pause, Play, RotateCcw, RotateCw, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import SaintIllustration from "../components/SaintIllustration";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";
import type { Story } from "../data/stories";

type StoryScreenProps = {
  story: Story;
  onBack: () => void;
};

const WPM = 175;
const RATE = 0.98;
const PITCH = 1.0;
const PAGE_END_PAD_MS = 900;
const BOUNDARY_GRACE_MS = 800;

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/);
}

function wordDurationMs(word: string): number {
  return ((word.length + 1) / WPM) * 60000 * (1 / RATE);
}

function buildDurations(words: string[]): number[] {
  const out: number[] = [];
  let acc = 0;
  for (const w of words) {
    acc += wordDurationMs(w);
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

function scoreVoice(v: { name: string; language: string; localService?: boolean }): number {
  const n = v.name;
  let s = 0;
  if (/online|natural|neural/i.test(n)) s += 4;
  if (v.localService === false) s += 1;
  if (/female|aria|jenny|michelle|ana|ava|erika|zira|samantha|susan|hazel|serena|libby|katherine|karen|moira|sonia|tessa|veena/i.test(n)) s += 3;
  if (/male|david|mark|guy|george|daniel|ryan|james|alex|christopher|eric|thomas|fred|liam|matthew/i.test(n)) s -= 4;
  if (/en[-_ ]?(US|USA)/i.test(v.language)) s += 2;
  else if (/^en/i.test(v.language)) s += 1;
  return s;
}

export default function StoryScreen({ story, onBack }: StoryScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [page, setPage] = useState(0);
  const [reading, setReading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [voice, setVoice] = useState<string | undefined>(undefined);

  const pageRef = useRef(0);
  const readingRef = useRef(false);
  const durationsRef = useRef<number[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const speechStartRef = useRef(0);
  const consumedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);
  const advancedRef = useRef(false);
  const boundaryModeRef = useRef(false);

  const total = story.pages.length;
  const pct = Math.round(((page + 1) / total) * 100);
  const firstChar = story.pages[page].charAt(0);
  const rest = story.pages[page].slice(1);

  const words = useMemo(() => splitWords(rest), [rest]);

  useEffect(() => {
    let mounted = true;
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        if (!mounted) return;
        if (voices.length === 0) return;
        let best = voices[0];
        let bestScore = -Infinity;
        for (const v of voices) {
          const s = scoreVoice(v);
          if (s > bestScore) {
            bestScore = s;
            best = v;
          }
        }
        setVoice(best.identifier || best.name);
      })
      .catch(() => {});
    return () => {
      mounted = false;
      Speech.stop();
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
  }

  function stopReading() {
    cancelledRef.current = true;
    readingRef.current = false;
    clearTimers();
    Speech.stop();
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

  function startPage(p: number) {
    pageRef.current = p;
    boundaryModeRef.current = false;
    offsetsRef.current = buildWordOffsets(story.pages[p]);
    durationsRef.current = buildDurations(splitWords(story.pages[p]));
    advancedRef.current = false;
    cancelledRef.current = false;
    speechStartRef.current = Date.now();
    consumedRef.current = 0;

    Speech.speak(story.pages[p], {
      language: "en",
      voice,
      rate: RATE,
      pitch: PITCH,
      onBoundary: (ev: any) => {
        if (ev && typeof ev.charIndex === "number" && (ev.name === undefined || ev.name === "word")) {
          boundaryModeRef.current = true;
          setActiveWord(wordIndexFromChar(ev.charIndex, offsetsRef.current));
        }
      },
      onDone: () => {
        if (!cancelledRef.current) advancePage();
      },
      onStopped: () => {
        if (cancelledRef.current) return;
      },
      onError: () => {
        if (cancelledRef.current) return;
        advancePage();
      },
    });

    fallbackTimerRef.current = setTimeout(() => {
      if (!boundaryModeRef.current && readingRef.current) startEstimateInterval();
    }, BOUNDARY_GRACE_MS);
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
      readingRef.current = false;
      setActiveWord(null);
      setReading(false);
      setPaused(false);
    }
  }

  function startReading() {
    readingRef.current = true;
    setReading(true);
    setPaused(false);
    startPage(pageRef.current);
  }

  function togglePause() {
    if (paused) {
      consumedRef.current += Date.now() - speechStartRef.current;
      speechStartRef.current = Date.now();
      Speech.resume();
      if (!boundaryModeRef.current) startEstimateInterval();
      setPaused(false);
    } else {
      consumedRef.current += Date.now() - speechStartRef.current;
      clearTimers();
      Speech.pause();
      setPaused(true);
    }
  }

  function goNext() {
    if (reading) stopReading();
    if (page + 1 < total) setPage(page + 1);
    else onBack();
  }

  function goPrev() {
    if (reading) stopReading();
    if (page > 0) setPage(page - 1);
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.headerBtn} hitSlop={8}>
          <ChevronDown size={18} color={colors.cream} />
        </Pressable>
        <Text style={styles.headerTitle}>{story.title}</Text>
        <Pressable style={styles.headerBtn} hitSlop={8}>
          <Settings size={17} color={colors.cream} />
        </Pressable>
      </View>

      <View style={styles.artWrap}>
        <SaintIllustration palette={story.palette} art={story.art} height={180} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
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
        <Text style={styles.pageText}>
          <Text style={styles.dropCap}>{firstChar}</Text>
          {words.map((w, i) => (
            <Text
              key={`${i}-${w}`}
              style={[i === activeWord && reading ? styles.activeWord : null, paused && i === activeWord && styles.activeWordPaused]}
            >
              {w}{" "}
            </Text>
          ))}
        </Text>
      </ScrollView>

      <View style={styles.progressWrap}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct}%` }]} />
        </View>
        <View style={styles.progressMeta}>
          <Text style={styles.progressText}>Page {page + 1}</Text>
          <Text style={styles.progressText}>{total - page - 1} to go</Text>
        </View>
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
          {reading ? (
            paused ? (
              <Play size={26} color={colors.onGold} fill={colors.onGold} style={{ marginLeft: 3 }} />
            ) : (
              <Pause size={26} color={colors.onGold} fill={colors.onGold} />
            )
          ) : (
            <Play size={26} color={colors.onGold} fill={colors.onGold} style={{ marginLeft: 3 }} />
          )}
        </Pressable>
        <Pressable onPress={goNext} hitSlop={8}>
          <RotateCw size={22} color={colors.cream} />
        </Pressable>
      </View>
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
    paddingBottom: 8,
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
    fontFamily: fonts.display,
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
  progressWrap: {
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  track: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.ring,
    overflow: "hidden",
  },
  fill: {
    height: 3,
    backgroundColor: colors.gold,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressText: {
    fontFamily: fonts.ui,
    fontSize: 12,
    color: colors.mutedDim,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 8,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
});
}
