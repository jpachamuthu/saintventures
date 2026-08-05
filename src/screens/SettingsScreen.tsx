import React, { useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav, { type TabId } from "../components/BottomNav";
import { useTheme } from "../components/ThemeContext";
import { fonts, radius, type ThemeColors } from "../theme";

type SettingsScreenProps = {
  onFooterTab: (tab: TabId) => void;
};

export default function SettingsScreen({ onFooterTab }: SettingsScreenProps) {
  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  const toggleAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

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
        <Text style={styles.title}>Settings</Text>

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
      </ScrollView>

      <BottomNav active="settings" onTab={onFooterTab} />
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
      paddingBottom: 130,
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
      backgroundColor: colors.bgCard,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.ring,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
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