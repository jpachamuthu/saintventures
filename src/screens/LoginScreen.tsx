import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import LogoMark from "../components/Logo";
import GoogleButton from "../components/GoogleButton";
import { useTheme } from "../components/ThemeContext";
import { fonts, type ThemeColors } from "../theme";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);

  return (
    <LinearGradient
      colors={[colors.bgCardAlt, colors.bg, colors.bgCard]}
      style={styles.root}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <View style={styles.top}>
        <LogoMark size={92} />
      </View>

      <View style={styles.body}>
        <Text style={styles.heading}>Welcome to the family</Text>
        <Text style={styles.subheading}>
          Bedtime stories of the saints, made gentle and exciting for little hearts.
        </Text>

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
      </View>

      <View style={styles.bottom}>
        <Pressable>
          <Text style={styles.fineprint}>Privacy · Terms</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    top: {
      paddingTop: 92,
      alignItems: "center",
    },
    body: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 30,
      marginTop: -40,
    },
    heading: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      color: colors.cream,
      textAlign: "center",
    },
    subheading: {
      fontFamily: fonts.ui,
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
      textAlign: "center",
      marginTop: 12,
      marginHorizontal: 8,
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
      alignItems: "center",
    },
    fineprint: {
      fontFamily: fonts.uiMedium,
      fontSize: 12,
      color: colors.mutedDim,
    },
  });
}
