import React, { useRef } from "react";
import { Animated, Pressable, Text, View, StyleSheet } from "react-native";
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
  const Icon = item.icon;

  const handlePress = () => {
    scale.setValue(0.82);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.12, friction: 3, tension: 220, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 180, useNativeDriver: true }),
    ]).start();
    onTab(item.id);
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.label}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
    >
      <Animated.View
        style={[styles.iconWrap, isActive && styles.iconWrapActive, { transform: [{ scale }] }]}
      >
        <Icon
          size={22}
          strokeWidth={isActive ? 2.4 : 2}
          color={isActive ? colors.onGold : colors.mutedDim}
        />
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
      <View style={styles.bar}>
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

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    wrap: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 0,
    },
    bar: {
      flexDirection: "row",
      backgroundColor: colors.bgCard,
      borderColor: colors.ring,
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
    },
    iconWrapActive: {
      backgroundColor: colors.gold,
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
