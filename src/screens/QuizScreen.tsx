import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Medal, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../components/ThemeContext";
import GoldGradient from "../components/GoldGradient";
import SaintIllustration from "../components/SaintIllustration";
import { fonts, radius, type ThemeColors } from "../theme";
import { quizzes } from "../data/quizzes";
import type { Story } from "../data/stories";
import Fireworks from "../components/Fireworks";
import { playCelebrationSound, sayTryAgain } from "../audio/celebrate";
import { useBadges } from "../hooks/useBadges";

type QuizScreenProps = {
  story: Story;
  onExit: () => void;
  onDone: () => void;
};

export default function QuizScreen({ story, onExit, onDone }: QuizScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const questions = useMemo(() => quizzes[story.id] ?? [], [story.id]);
  const [qIndex, setQIndex] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [fire, setFire] = useState(0);
  const [done, setDone] = useState(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throb = useRef(new Animated.Value(1)).current;
  const { has, count, earn } = useBadges();

  const q = questions[Math.min(qIndex, questions.length - 1)];

  useEffect(
    () => () => {
      if (advanceRef.current) clearTimeout(advanceRef.current);
      if (resetRef.current) clearTimeout(resetRef.current);
    },
    []
  );

  useEffect(() => {
    if (!done) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(throb, { toValue: 1.18, duration: 550, useNativeDriver: true }),
        Animated.timing(throb, { toValue: 1, duration: 550, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [done, throb]);

  function handlePick(i: number) {
    if (done || result === "correct" || wrong.includes(i)) return;
    if (i === q.correct) {
      setResult("correct");
      setFire((f) => f + 1);
      playCelebrationSound();
      advanceRef.current = setTimeout(() => {
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          setWrong([]);
          setResult("idle");
        } else {
          setDone(true);
          if (!has(story.id)) earn(story.id);
        }
      }, 1800);
    } else {
      setWrong((w) => [...w, i]);
      setResult("wrong");
      sayTryAgain();
      resetRef.current = setTimeout(() => setResult("idle"), 900);
    }
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeTitle}>No quiz for this story yet.</Text>
          <Pressable style={styles.replayBtn} onPress={onExit}>
            <GoldGradient style={StyleSheet.absoluteFill} />
            <Text style={styles.replayBtnLabel}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Fireworks trigger={fire} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz · {story.saint}</Text>
        <Pressable
          onPress={onExit}
          style={styles.headerBtn}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Exit quiz"
        >
          <X size={20} color={colors.cream} />
        </Pressable>
      </View>

      {done ? (
        <View style={styles.badgeWrap}>
          <View style={styles.heroFrame}>
            <SaintIllustration
              palette={story.palette}
              art={story.art}
              image={story.imageSmall ?? story.hero}
              height={160}
            />
            <Animated.View style={[styles.cornerBadge, { transform: [{ scale: throb }] }]}>
              <Medal size={22} color={colors.onGold} fill={colors.onGold} />
            </Animated.View>
          </View>
          <Text style={styles.badgeTitle}>Well done!</Text>
          <Text style={styles.badgeText}>You earned the {story.saint} badge</Text>
          <View style={styles.badgeCountPill}>
            <Medal size={14} color={colors.gold} fill={colors.gold} />
            <Text style={styles.badgeCountText}>
              {count()} badge{count() === 1 ? "" : "s"} earned
            </Text>
          </View>
          <Pressable style={styles.replayBtn} onPress={onDone}>
            <GoldGradient style={StyleSheet.absoluteFill} />
            <Text style={styles.replayBtnLabel}>Done</Text>
          </Pressable>
          <View style={styles.actionRow}>
            <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.optPressed]}>
              <Text style={styles.actionBtnLabel}>Fun facts about the Saint</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.optPressed]}>
              <Text style={styles.actionBtnLabel}>Prayer</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              Question {qIndex + 1} of {questions.length}
            </Text>
            <View style={styles.dots}>
              {questions.map((_, i) => (
                <View key={i} style={[styles.dot, i === qIndex && styles.dotActive]} />
              ))}
            </View>
          </View>

          <View style={styles.qCard}>
            <Text style={styles.qText}>{q.question}</Text>
          </View>

          <View style={styles.options}>
            {q.choices.map((c, i) => (
              <Pressable
                key={i}
                onPress={() => handlePick(i)}
                style={({ pressed }) => [
                  styles.opt,
                  wrong.includes(i) && styles.optWrong,
                  result === "correct" && i === q.correct && styles.optRight,
                  result === "correct" && i !== q.correct && styles.optDim,
                  pressed && styles.optPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={c}
              >
                <View
                  style={[
                    styles.optLetter,
                    result === "correct" && i === q.correct && styles.optLetterRight,
                  ]}
                >
                  <Text
                    style={[
                      styles.optLetterText,
                      result === "correct" && i === q.correct && { color: colors.white },
                    ]}
                  >
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optText,
                    wrong.includes(i) && { color: colors.mutedDim, textDecorationLine: "line-through" },
                    result === "correct" && i === q.correct && { color: colors.onGold },
                  ]}
                >
                  {c}
                </Text>
              </Pressable>
            ))}
          </View>

          {result === "wrong" && <Text style={styles.tryAgain}>Try again — you can do it!</Text>}
        </>
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
    headerTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: colors.cream,
      flexShrink: 1,
    },
    headerBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.bgCard,
      alignItems: "center",
      justifyContent: "center",
    },
    progressRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      marginTop: 10,
    },
    progressText: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      letterSpacing: 0.5,
      color: colors.gold,
      textTransform: "uppercase",
    },
    dots: {
      flexDirection: "row",
      gap: 6,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.ring,
    },
    dotActive: {
      backgroundColor: colors.gold,
    },
    qCard: {
      marginHorizontal: 22,
      marginTop: 18,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.card,
      paddingHorizontal: 20,
      paddingVertical: 22,
    },
    qText: {
      fontFamily: fonts.card,
      fontSize: 22,
      lineHeight: 31,
      color: colors.cream,
    },
    options: {
      paddingHorizontal: 22,
      marginTop: 22,
    },
    opt: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.bgCard,
      borderWidth: 1.5,
      borderColor: colors.ring,
      borderRadius: radius.card,
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginBottom: 12,
    },
    optRight: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    optWrong: {
      borderColor: colors.martyrRed,
    },
    optDim: {
      opacity: 0.45,
    },
    optPressed: {
      opacity: 0.8,
    },
    optLetter: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.ring,
      alignItems: "center",
      justifyContent: "center",
    },
    optLetterRight: {
      backgroundColor: colors.onGold,
    },
    optLetterText: {
      fontFamily: fonts.uiBold,
      fontSize: 14,
      color: colors.cream,
    },
    optText: {
      fontFamily: fonts.uiMedium,
      fontSize: 16,
      lineHeight: 23,
      color: colors.cream,
      flexShrink: 1,
    },
    tryAgain: {
      textAlign: "center",
      fontFamily: fonts.uiBold,
      fontSize: 13,
      color: colors.gold,
      marginTop: 4,
    },
    badgeWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
    },
    heroFrame: {
      width: 210,
      alignSelf: "center",
      marginBottom: 20,
    },
    cornerBadge: {
      position: "absolute",
      top: -13,
      right: -13,
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.gold,
      borderWidth: 3,
      borderColor: colors.bgCard,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.4,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 6,
    },
    badgeTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      color: colors.cream,
    },
    badgeText: {
      fontFamily: fonts.ui,
      fontSize: 15,
      color: colors.muted,
      textAlign: "center",
      marginTop: 6,
    },
    badgeCountPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.pill,
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginTop: 18,
    },
    badgeCountText: {
      fontFamily: fonts.metaBold,
      fontSize: 12,
      color: colors.cream,
    },
    replayBtn: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.pill,
      paddingHorizontal: 34,
      paddingVertical: 14,
      marginTop: 26,
      overflow: "hidden",
    },
    replayBtnLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      color: colors.onGold,
    },
    actionRow: {
      flexDirection: "row",
      gap: 12,
      width: "100%",
      marginTop: 14,
    },
    actionBtn: {
      flex: 1,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.ring,
      borderRadius: radius.card,
      paddingVertical: 14,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    actionBtnLabel: {
      fontFamily: fonts.uiBold,
      fontSize: 12.5,
      lineHeight: 16,
      color: colors.cream,
      textAlign: "center",
    },
  });
}
