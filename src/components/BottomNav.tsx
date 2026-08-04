import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { House, Library, Sparkles, type LucideIcon } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../theme";

export type TabId = "home" | "library" | "quiz";

type TabItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const TABS: TabItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "library", label: "Library", icon: Library },
  { id: "quiz", label: "Quiz Time", icon: Sparkles },
];

type BottomNavProps = {
  active: TabId;
  onTab: (tab: TabId) => void;
};

export default function BottomNav({ active, onTab }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 14) }]}>
      <View style={styles.bar}>
        {TABS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onTab(item.id)}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.4 : 2}
                  color={isActive ? theme.colors.onGold : theme.colors.mutedDim}
                />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
  },
  bar: {
    flexDirection: "row",
    backgroundColor: theme.colors.bgCard,
    borderColor: theme.colors.ring,
    borderWidth: 1,
    borderRadius: 26,
    paddingVertical: 8,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
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
    backgroundColor: theme.colors.gold,
  },
  label: {
    fontFamily: theme.fonts.uiBold,
    fontSize: 10.5,
    color: theme.colors.mutedDim,
  },
  labelActive: {
    color: theme.colors.gold,
  },
});
