import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Logo from "../components/Logo";
import GoldGradient from "../components/GoldGradient";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { useTheme } from "../components/ThemeContext";
import { fonts, type ThemeColors } from "../theme";

type StartupScreenProps = {
  onStart: () => void;
};

export default function StartupScreen({ onStart }: StartupScreenProps) {
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
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
    <LinearGradient colors={[colors.bgCardAlt, colors.bg, colors.bgCard]} style={styles.root}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Animated.View style={[styles.screen, { opacity: exitOp, transform: [{ scale: exitSc }, { translateY: exitDy }] }]}>
        <Animated.View
          onLayout={onHeroLayout}
          style={[styles.heroWrap, { transform: [{ translateY: heroDy }, { scale: heroSc }] }]}
        >
          <Logo size={88} />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View style={{ opacity: bodyOp }}>
            <View style={styles.dividerWrap}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ready for an adventure?</Text>
              <View style={styles.divider} />
            </View>

            <Pressable
              onPress={handleStart}
              style={({ pressed }) => [styles.startBtn, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <GoldGradient style={StyleSheet.absoluteFill} />
              <Text style={styles.startBtnText}>Get Started</Text>
            </Pressable>

            <Text style={styles.footnote}>
              No account needed.{"\n"}
              Tap in and explore the saints.
            </Text>
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
    </LinearGradient>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    screen: {
      flex: 1,
    },
    heroWrap: {
      position: "absolute",
      top: 74,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    body: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 30,
      paddingTop: 190,
    },
    dividerWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 24,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.gold,
      opacity: 0.35,
    },
    dividerText: {
      fontFamily: fonts.uiBold,
      fontSize: 13,
      letterSpacing: 0.3,
      color: colors.muted,
      textAlign: "center",
    },
    startBtn: {
      height: 58,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 5 },
      elevation: 6,
    },
    startBtnText: {
      fontFamily: fonts.uiBold,
      fontSize: 17,
      color: colors.onGold,
      zIndex: 1,
    },
    pressed: {
      opacity: 0.9,
    },
    footnote: {
      fontFamily: fonts.ui,
      fontSize: 13,
      lineHeight: 19,
      color: colors.mutedDim,
      textAlign: "center",
      marginTop: 18,
    },
    bottom: {
      paddingBottom: 36,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    separator: {
      fontFamily: fonts.ui,
      fontSize: 12,
      color: colors.mutedDim,
    },
    fineprint: {
      fontFamily: fonts.uiMedium,
      fontSize: 12,
      color: colors.mutedDim,
    },
  });
}