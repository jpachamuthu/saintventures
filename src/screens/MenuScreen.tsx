import React, { useRef, useState } from "react";
import { Animated, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, Award, BookOpen, CalendarDays, ChevronRight, FileText, Images, Library, ListChecks, Mail, Medal, Minus, Moon, Plus, ShieldCheck, Sun, Volume2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../components/ThemeContext";
import type { TabId } from "../components/BottomNav";
import LegalPage, { CREDITS_SECTIONS, HOWTO_SECTIONS, PRIVACY_SECTIONS, TERMS_SECTIONS } from "../components/LegalPage";
import { getStoryMusicVolume, setStoryMusicVolume } from "../audio/backgroundMusic";
import { fonts, radius, type ThemeColors } from "../theme";

type MenuScreenProps = {
  onBack: () => void;
  onGoTab: (tab: TabId) => void;
  onOpenGallery: () => void;
};

export default function MenuScreen({ onBack, onGoTab, onOpenGallery }: MenuScreenProps) {
  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  const toggleAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [volume, setVolume] = useState(getStoryMusicVolume);

  const changeVolume = (delta: number) => {
    const next = Math.min(10, Math.max(0, volume + delta));
    setStoryMusicVolume(next);
    setVolume(next);
  };

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
          <Text style={styles.groupLabel}>Story music</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Volume2 size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Volume</Text>
                <Text style={styles.rowSubtitle}>Background music while reading</Text>
              </View>
            </View>
            <View style={styles.stepperRow}>
              <Pressable
                onPress={() => changeVolume(-1)}
                style={[styles.stepBtn, volume === 0 && styles.stepBtnDisabled]}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Lower music volume"
              >
                <Minus size={16} color={volume === 0 ? colors.mutedDim : colors.cream} />
              </Pressable>
              <View style={styles.meter}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <View
                    key={i}
                    style={[styles.meterSeg, i < volume && { backgroundColor: colors.gold }]}
                  />
                ))}
              </View>
              <Pressable
                onPress={() => changeVolume(1)}
                style={[styles.stepBtn, volume === 10 && styles.stepBtnDisabled]}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Raise music volume"
              >
                <Plus size={16} color={volume === 10 ? colors.mutedDim : colors.cream} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Browse</Text>
          <View style={styles.card}>
            <Pressable style={styles.row} onPress={() => onGoTab("library")}>
              <View style={styles.iconWrap}>
                <Library size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Library</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={() => onGoTab("badges")}>
              <View style={styles.iconWrap}>
                <Medal size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Badges</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={() => onGoTab("feasts")}>
              <View style={styles.iconWrap}>
                <CalendarDays size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Feast Days</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={() => onGoTab("quizzes")}>
              <View style={styles.iconWrap}>
                <ListChecks size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Quizzes</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={onOpenGallery}>
              <View style={styles.iconWrap}>
                <Images size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Gallery</Text>
                <Text style={styles.rowSubtitle}>All saint artwork</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Help</Text>
          <View style={styles.card}>
            <Pressable style={styles.row} onPress={() => setShowHowTo(true)}>
              <View style={styles.iconWrap}>
                <BookOpen size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>How to use the app</Text>
                <Text style={styles.rowSubtitle}>Stories, quizzes, badges and more</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable
              style={styles.row}
              onPress={() => Linking.openURL(`mailto:juderam@hotmail.com?subject=${encodeURIComponent("SaintVentures - App Feedback")}`)}
            >
              <View style={styles.iconWrap}>
                <Mail size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Send feedback</Text>
                <Text style={styles.rowSubtitle}>Tell us what you think</Text>
              </View>
              <ChevronRight size={16} color={colors.mutedDim} />
            </Pressable>
          </View>
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
            <View style={styles.divider} />
            <Pressable style={styles.row} onPress={() => setShowCredits(true)}>
              <View style={styles.iconWrap}>
                <Award size={18} color={colors.gold} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Credits & Attribution</Text>
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
      <LegalPage
        visible={showCredits}
        title="Credits & Attribution"
        sections={CREDITS_SECTIONS}
        onClose={() => setShowCredits(false)}
      />
      <LegalPage
        visible={showHowTo}
        title="How to use the app"
        sections={HOWTO_SECTIONS}
        onClose={() => setShowHowTo(false)}
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
      fontFamily: fonts.displayBold,
      fontSize: 30,
      lineHeight: 32,
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
    stepperRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    stepBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.bgCardAlt,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    stepBtnDisabled: {
      opacity: 0.5,
    },
    meter: {
      flex: 1,
      flexDirection: "row",
      gap: 4,
    },
    meterSeg: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.ring,
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
