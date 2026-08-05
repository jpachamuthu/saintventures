import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Logo from "../components/Logo";
import { useTheme } from "../components/ThemeContext";
import type { ThemeColors } from "../theme";

type SplashScreenProps = {
  onDone: () => void;
};

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const { colors, isDark } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 650, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [fade, scale, onDone]);

  const styles = createStyles(colors);

  return (
    <LinearGradient
      colors={[colors.bgCardAlt, colors.bg, colors.bgCard]}
      style={styles.root}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <Animated.View style={[styles.center, { opacity: fade, transform: [{ scale }] }]}>
        <Logo size={132} />
        <View style={styles.ornament}>
          <View style={styles.line} />
          <View style={styles.dot} />
          <View style={styles.line} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
      alignItems: "center",
    },
    ornament: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 26,
    },
    line: {
      width: 46,
      height: 1,
      backgroundColor: colors.gold,
      opacity: 0.5,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.gold,
    },
  });
}
