import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import DawnSky from "../components/DawnSky";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { fonts } from "../theme";

type StartupScreenProps = {
  onStart: () => void;
};

const INK = "#2A1605";
const PAPER = "#FFFFFF";
const PAPER_SOFT = "rgba(255, 255, 255, 0.82)";
const PAPER_FAINT = "rgba(255, 255, 255, 0.68)";

function GoldCross({ size = 30 }: { size?: number }) {
  const w = size;
  const h = (size * 46) / 30;
  return (
    <Svg width={w} height={h} viewBox="0 0 30 46">
      <Defs>
        <LinearGradient id="crossGold" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F9D06C" />
          <Stop offset="1" stopColor="#E3A63C" />
        </LinearGradient>
      </Defs>
      <Rect x="11.5" y="2" width="7" height="42" rx="3.5" fill="url(#crossGold)" />
      <Rect x="3" y="12" width="24" height="7" rx="3.5" fill="url(#crossGold)" />
    </Svg>
  );
}

export default function StartupScreen({ onStart }: StartupScreenProps) {
  const styles = createStyles();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const exiting = useRef(false);

  const heroDy = useRef(new Animated.Value(0)).current;
  const heroSc = useRef(new Animated.Value(1)).current;
  const bodyOp = useRef(new Animated.Value(0)).current;
  const exitOp = useRef(new Animated.Value(1)).current;
  const exitSc = useRef(new Animated.Value(1)).current;
  const exitDy = useRef(new Animated.Value(0)).current;
  const launched = useRef(false);

  const onHeroLayout = (e: any) => {
    if (launched.current) return;
    launched.current = true;
    const { y, height } = e.nativeEvent.layout;
    const win = Dimensions.get("window").height;
    const desiredTop = win / 2 - height / 2;
    heroDy.setValue(desiredTop - y);
    heroSc.setValue(1.5);
    Animated.parallel([
      Animated.spring(heroDy, { toValue: 0, friction: 8, tension: 60, useNativeDriver: true }),
      Animated.spring(heroSc, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      Animated.timing(bodyOp, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    }, 620);
  };

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
      <DawnSky />
      <Animated.View style={[styles.screen, { opacity: exitOp, transform: [{ scale: exitSc }, { translateY: exitDy }] }]}>
        <Animated.View
          onLayout={onHeroLayout}
          style={[styles.heroWrap, { transform: [{ translateY: heroDy }, { scale: heroSc }] }]}
        >
          <GoldCross size={30} />
          <Text style={styles.title}>Saint{"\n"}Adventures</Text>
        </Animated.View>

        <View style={styles.body}>
          <Animated.View style={{ opacity: bodyOp }}>
            <Text style={styles.eyebrow}>Real people. Extraordinary faith.</Text>
            <Text style={styles.copy}>
              Discover the inspiring stories of the saints and how they can guide your journey
              today.
            </Text>

            <Pressable
              onPress={handleStart}
              style={({ pressed }) => [styles.startBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Get Started"
            >
              <Text style={styles.startBtnText}>Get Started</Text>
              <ArrowRight size={19} color={INK} strokeWidth={2.4} />
            </Pressable>

            <Text style={styles.footnote}>No account needed.{"\n"}Tap in and explore the saints.</Text>
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
    heroWrap: {
      position: "absolute",
      top: 92,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    title: {
      fontFamily: fonts.serif,
      fontSize: 52,
      lineHeight: 56,
      letterSpacing: 0.5,
      color: PAPER,
      textAlign: "center",
      marginTop: 14,
      textShadowColor: "rgba(10, 10, 40, 0.45)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 10,
    },
    body: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 34,
      paddingBottom: 118,
    },
    eyebrow: {
      fontFamily: fonts.metaBold,
      fontSize: 12.5,
      letterSpacing: 3.2,
      color: PAPER_SOFT,
      textAlign: "center",
      textTransform: "uppercase",
    },
    copy: {
      fontFamily: fonts.ui,
      fontSize: 16,
      lineHeight: 24,
      color: PAPER_SOFT,
      textAlign: "center",
      marginTop: 12,
      paddingHorizontal: 8,
      textShadowColor: "rgba(10, 10, 40, 0.5)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 6,
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
