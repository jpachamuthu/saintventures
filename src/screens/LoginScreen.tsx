import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Logo from "../components/Logo";
import GoogleButton from "../components/GoogleButton";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { useTheme } from "../components/ThemeContext";
import { fonts, type ThemeColors } from "../theme";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const dy = useRef(new Animated.Value(0)).current;
  const sc = useRef(new Animated.Value(1)).current;
  const bodyOp = useRef(new Animated.Value(0)).current;
  const launched = useRef(false);

  const onHeroLayout = (e: any) => {
    if (launched.current) return;
    launched.current = true;
    const { y, height } = e.nativeEvent.layout;
    const win = Dimensions.get("window").height;
    const desiredTop = win / 2 - height / 2;
    dy.setValue(desiredTop - y);
    sc.setValue(1.5);
    Animated.parallel([
      Animated.spring(dy, { toValue: 0, friction: 8, tension: 60, useNativeDriver: true }),
      Animated.spring(sc, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      Animated.timing(bodyOp, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    }, 620);
  };

  return (
    <LinearGradient
      colors={[colors.bgCardAlt, colors.bg, colors.bgCard]}
      style={styles.root}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <Animated.View
        onLayout={onHeroLayout}
        style={[styles.heroWrap, { transform: [{ translateY: dy }, { scale: sc }] }]}
      >
        <Logo size={88} />
      </Animated.View>

      <View style={styles.body}>
        <Animated.View style={{ opacity: bodyOp }}>
          <View style={styles.dividerWrap}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Sign in to begin</Text>
            <View style={styles.divider} />
          </View>

          <GoogleButton onPress={onLogin} />

          <Text style={styles.footnote}>
            One gentle sign-in for the whole family.{"\n"}
            Email &amp; child profiles coming soon.
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
      marginVertical: 28,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.ring,
    },
    dividerText: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      letterSpacing: 1.2,
      color: colors.mutedDim,
      textTransform: "uppercase",
    },
    footnote: {
      fontFamily: fonts.ui,
      fontSize: 12.5,
      lineHeight: 19,
      color: colors.mutedDim,
      textAlign: "center",
      marginTop: 22,
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