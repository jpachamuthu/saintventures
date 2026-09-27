import React, { useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, ChevronRight, FileText, Moon, ShieldCheck, Sun } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../components/ThemeContext";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { fonts, radius, type ThemeColors } from "../theme";

type MenuScreenProps = {
  onBack: () => void;
};

export default function MenuScreen({ onBack }: MenuScreenProps) {
  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  const toggleAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleToggle = () => {
    Animated.timing(toggleAnim, {
      toValue: isDark ? 0 : 1,
      duration: 220,
      useNativeDriver: false,
    }).start();
    toggleTheme();
  };

  const knobX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  const trackColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.ring, colors.gold],
  });

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
            <ArrowLeft size={18} color={colors.cream} />
          </Pressable>
          <Text style={styles.title}>Menu</Text>
          <View style={styles.backBtnSpacer} />
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Appearance</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                {isDark ? (
                  <Moon size={18} color={colors.gold} />
                ) : (
                  <Sun size={18} color={colors.gold} />
                )}
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Dark mode</Text>
                <Text style={styles.rowSubtitle}>{isDark ? "On" : "Off"}</Text>
              </View>
              <Pressable
                onPress={handleToggle}
                accessibilityRole="switch"
                accessibilityState={{ checked: isDark }}
                accessibilityLabel="Toggle dark mode"
              >
                <Animated.View
                  style={[
                    styles.track,
                    { backgroundColor: trackColor, borderColor: colors.ring },
                  ]}
                >
                  <Animated.View style={[styles.knob, { transform: [{ translateX: knobX }] }]} />
                </Animated.View>
              </Pressable>
            </View>
          </View>
          <Text style={styles.hint}>
            Choose the look that suits bedtime best — soft cream by day, deep navy at night.
          </Text>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>About</Text>
          <View style={styles.card}>
            <Pressable style={styles.row} onPress={() => setShowPrivacy(true)}>
              <View style={styles.iconWrap}>
                <ShieldCheck size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Privacy Policy</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={() => setShowTerms(true)}>
              <View style={styles.iconWrap}>
                <FileText size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Terms of Service</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scroll: {
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.glassFill,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    backBtnSpacer: {
      width: 40,
    },
    title: {
      fontFamily: fonts.serif,
      fontSize: 32,
      color: colors.cream,
    },
    group: {
      marginTop: 24,
    },
    groupLabel: {
      fontFamily: fonts.uiBold,
      fontSize: 12,
      letterSpacing: 1.2,
      color: colors.mutedDim,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    card: {
      backgroundColor: colors.glassFill,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    divider: {
      height: 1,
      backgroundColor: colors.ring,
      marginLeft: 52,
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.bgCardAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    rowText: {
      flex: 1,
    },
    rowTitle: {
      fontFamily: fonts.uiBold,
      fontSize: 15,
      color: colors.cream,
    },
    rowSubtitle: {
      fontFamily: fonts.ui,
      fontSize: 12.5,
      color: colors.mutedDim,
      marginTop: 2,
    },
    track: {
      width: 50,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 2,
    },
    knob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.white,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 3,
    },
    hint: {
      fontFamily: fonts.ui,
      fontSize: 12.5,
      lineHeight: 18,
      color: colors.mutedDim,
      marginTop: 10,
      marginHorizontal: 4,
    },
  });
}
