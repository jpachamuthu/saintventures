import React, { useRef } from "react";
import { Animated, Easing, Platform, Pressable, Text, View, StyleSheet, type ViewStyle } from "react-native";
import { House, Library, Medal, Settings, type LucideIcon } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";
import { fonts, type ThemeColors } from "../theme";

export type TabId = "home" | "library" | "badges" | "settings";

type TabItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const TABS: TabItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "library", label: "Library", icon: Library },
  { id: "badges", label: "Badges", icon: Medal },
  { id: "settings", label: "Settings", icon: Settings },
];

type BottomNavProps = {
  active: TabId;
  onTab: (tab: TabId) => void;
};

function TabButton({
  item,
  isActive,
  styles,
  colors,
  onTab,
}: {
  item: TabItem;
  isActive: boolean;
  styles: ReturnType<typeof createStyles>;
  colors: ThemeColors;
  onTab: (tab: TabId) => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const lift = useRef(new Animated.Value(0)).current;
  const wiggle = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const Icon = item.icon;

  const handlePress = () => {
    Animated.parallel([
      // Squash down, then spring up big and settle with a bounce
      Animated.sequence([
        Animated.timing(scale, { toValue: 0.78, duration: 70, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.28, friction: 3, tension: 300, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, tension: 240, useNativeDriver: true }),
      ]),
      // Jump high out of the bar, then fall back and land with a bounce
      Animated.sequence([
        Animated.timing(lift, {
          toValue: -36,
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(lift, { toValue: 0, friction: 3, tension: 130, useNativeDriver: true }),
      ]),
      // Side-to-side wiggle for extra energy
      Animated.sequence([
        Animated.timing(wiggle, { toValue: -0.3, duration: 80, useNativeDriver: true }),
        Animated.timing(wiggle, { toValue: 0.3, duration: 120, useNativeDriver: true }),
        Animated.timing(wiggle, { toValue: -0.2, duration: 110, useNativeDriver: true }),
        Animated.timing(wiggle, { toValue: 0, duration: 130, useNativeDriver: true }),
      ]),
      // Bright expanding glow ring that flashes and fades
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 90, useNativeDriver: true }),
        Animated.spring(glow, { toValue: 0, friction: 4, tension: 90, useNativeDriver: true }),
      ]),
    ]).start();
    onTab(item.id);
  };

  const glowColor = isActive ? colors.cream : colors.gold;

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.label}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
    >
      <Animated.View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
        <Animated.View
          style={[
            styles.glow,
            { backgroundColor: glowColor, opacity: glow, transform: [{ scale: glow }] },
          ]}
        />
        <Animated.View
          style={[
            styles.iconCenter,
            {
              transform: [
                { scale },
                { translateY: lift },
                { rotate: wiggle.interpolate({ inputRange: [-0.3, 0.3], outputRange: ["-14deg", "14deg"] }) },
              ],
            },
          ]}
        >
          <Icon
            size={22}
            strokeWidth={isActive ? 2.4 : 2}
            color={isActive ? colors.onGold : colors.mutedDim}
          />
        </Animated.View>
      </Animated.View>
      <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
    </Pressable>
  );
}

export default function BottomNav({ active, onTab }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 14) }]}>
      <View style={[styles.bar, WEB_BLUR]}>
        {TABS.map((item) => (
          <TabButton
            key={item.id}
            item={item}
            isActive={active === item.id}
            styles={styles}
            colors={colors}
            onTab={onTab}
          />
        ))}
      </View>
    </View>
  );
}

// Backdrop blur is web-only; native falls back to translucency.
const WEB_BLUR: ViewStyle | null =
  Platform.OS === "web" ? ({ backdropFilter: "blur(22px) saturate(1.5)" } as ViewStyle) : null;

function createStyles(colors: ThemeColors) {  return StyleSheet.create({
    wrap: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 0,
    },
    bar: {
      flexDirection: "row",
      backgroundColor: colors.glassFillStrong,
      borderColor: colors.glassBorder,
      borderWidth: 1,
      borderRadius: 26,
      paddingVertical: 8,
      paddingHorizontal: 6,
      shadowColor: "#000",
      shadowOpacity: 0.55,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 14,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      gap: 3,
      paddingVertical: 4,
    },
    pressed: {
      opacity: 0.75,
    },
    iconWrap: {
      width: 42,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
      zIndex: 2,
    },
    iconWrapActive: {
      backgroundColor: colors.gold,
    },
    glow: {
      position: "absolute",
      width: 64,
      height: 64,
      borderRadius: 32,
      opacity: 0,
    },
    iconCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontFamily: fonts.uiBold,
      fontSize: 10.5,
      color: colors.mutedDim,
    },
    labelActive: {
      color: colors.gold,
    },
  });
}
