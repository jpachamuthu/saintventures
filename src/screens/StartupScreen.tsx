import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Volume2 } from "lucide-react-native";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { isMasterMuted } from "../audio/backgroundMusic";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { fonts } from "../theme";

type StartupScreenProps = {
  onStart: () => void;
};

const INK = "#2A1605";
const PAPER_FAINT = "rgba(255, 255, 255, 0.68)";

export default function StartupScreen({ onStart }: StartupScreenProps) {
  const styles = createStyles();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const exiting = useRef(false);
  const voiceRetryRef = useRef<(() => void) | null>(null);

  const imgOp = useRef(new Animated.Value(0)).current;
  const ctaOp = useRef(new Animated.Value(0)).current;
  const ctaDy = useRef(new Animated.Value(18)).current;
  const skySc = useRef(new Animated.Value(1.06)).current;
  const nudge = useRef(new Animated.Value(0)).current;
  const exitOp = useRef(new Animated.Value(1)).current;
  const exitSc = useRef(new Animated.Value(1)).current;
  const exitDy = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Welcome voiceover. Browsers block audio before the first tap, and
    // expo-audio swallows that rejection where we can't see it — so always
    // retry on the first gesture as well as attempting immediately.
    let player: AudioPlayer | null = null;
    let stopped = false;
    const attempt = () => {
      if (!player || stopped) return;
      try {
        player.play();
      } catch {
        /* blocked or unavailable; gesture retry will follow */
      }
    };
    voiceRetryRef.current = attempt;
    const armGestureFallback = () => {
      if (Platform.OS !== "web" || typeof window === "undefined") return;
      const onGesture = () => {
        window.removeEventListener("pointerdown", onGesture);
        window.removeEventListener("keydown", onGesture);
        attempt();
      };
      window.addEventListener("pointerdown", onGesture);
      window.addEventListener("keydown", onGesture);
    };
    (async () => {
      try {
        if (isMasterMuted()) return;
        player = createAudioPlayer(require("../../assets/Welcome to SaintVentures Intro.mp3"));
        attempt();
        armGestureFallback();
      } catch {
        /* audio unavailable */
      }
    })();
    return () => {
      stopped = true;
      voiceRetryRef.current = null;
      try {
        player?.pause();
        player?.remove();
      } catch {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    // Cinematic open: fade in while settling from a slight zoom. One shot —
    // no looping drift, so the full-screen artwork never repaints and stays smooth.
    Animated.parallel([
      Animated.timing(imgOp, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(skySc, { toValue: 1, duration: 1600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    // Gentle nudge on the CTA arrow.
    const nudgeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(nudge, { toValue: 4, duration: 800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(nudge, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    nudgeLoop.start();
    // CTA rises in after the artwork lands.
    const c = setTimeout(() => {
      Animated.parallel([
        Animated.timing(ctaOp, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(ctaDy, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    }, 950);
    return () => {
      clearTimeout(c);
      nudgeLoop.stop();
    };
  }, [imgOp, skySc, nudge, ctaOp, ctaDy]);

  const handleStart = () => {
    if (exiting.current) return;
    exiting.current = true;
    Animated.parallel([
      Animated.timing(exitOp, { toValue: 0, duration: 320, useNativeDriver: true }),
      Animated.timing(exitSc, { toValue: 1.08, duration: 320, useNativeDriver: true }),
      Animated.timing(exitDy, { toValue: -22, duration: 320, useNativeDriver: true }),
    ]).start(() => onStart());
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: imgOp, transform: [{ scale: skySc }] }]}>
        <Image
          source={require("../../assets/Splash High Res.jpg")}
          style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
          resizeMode="cover"
        />
      </Animated.View>
      <Animated.View style={[styles.screen, { opacity: exitOp, transform: [{ scale: exitSc }, { translateY: exitDy }] }]}>
        <View style={styles.body}>
          <Animated.View style={{ opacity: ctaOp, transform: [{ translateY: ctaDy }] }}>
            <Pressable
              onPress={handleStart}
              style={({ pressed }) => [styles.startBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Get Started"
            >
              <Text style={styles.startBtnText}>Get Started</Text>
              <Animated.View style={{ transform: [{ translateX: nudge }] }}>
                <ArrowRight size={19} color={INK} strokeWidth={2.4} />
              </Animated.View>
            </Pressable>

            <Text style={styles.footnote}>No account needed.{"\n"}Tap in and explore the saints.</Text>
            <Pressable
              onPress={() => voiceRetryRef.current?.()}
              style={styles.listenBtn}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Play welcome message"
            >
              <Volume2 size={15} color={PAPER_FAINT} />
              <Text style={styles.listenText}>Hear our welcome</Text>
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.bottom}>
          <Pressable onPress={() => setShowPrivacy(true)} hitSlop={8}>
            <Text style={styles.fineprint}>Privacy</Text>
          </Pressable>
          <Text style={styles.separator}>·</Text>
          <Pressable onPress={() => setShowTerms(true)} hitSlop={8}>
            <Text style={styles.fineprint}>Terms of Service</Text>
          </Pressable>
        </View>
      </Animated.View>

      <LegalPage
        visible={showPrivacy}
        title="Privacy Policy"
        sections={PRIVACY_SECTIONS}
        onClose={() => setShowPrivacy(false)}
      />
      <LegalPage
        visible={showTerms}
        title="Terms of Service"
        sections={TERMS_SECTIONS}
        onClose={() => setShowTerms(false)}
      />
    </View>
  );
}

function createStyles() {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#0D1440",
    },
    screen: {
      flex: 1,
    },
    body: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 34,
      paddingBottom: 118,
    },
    startBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: 60,
      borderRadius: 999,
      backgroundColor: "#F6DA96",
      marginTop: 26,
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 8,
    },
    startBtnText: {
      fontFamily: fonts.uiBold,
      fontSize: 17,
      color: INK,
    },
    pressed: {
      opacity: 0.88,
      transform: [{ scale: 0.98 }],
    },
    footnote: {
      fontFamily: fonts.ui,
      fontSize: 12.5,
      lineHeight: 18,
      color: PAPER_FAINT,
      textAlign: "center",
      marginTop: 16,
    },
    listenBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginTop: 12,
    },
    listenText: {
      fontFamily: fonts.uiMedium,
      fontSize: 12.5,
      color: PAPER_FAINT,
    },
    bottom: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingBottom: 34,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    separator: {
      fontFamily: fonts.ui,
      fontSize: 12,
      color: PAPER_FAINT,
    },
    fineprint: {
      fontFamily: fonts.uiMedium,
      fontSize: 12,
      color: PAPER_FAINT,
    },
  });
}
