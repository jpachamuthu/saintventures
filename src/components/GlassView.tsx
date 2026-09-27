import React from "react";
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "./ThemeContext";

/** Shared backdrop-blur recipe so every dock in the app matches the Home bar. */
export const DOCK_BLUR = "blur(22px) saturate(1.5)";

export function webBlurStyle(): ViewStyle | null {
  if (Platform.OS !== "web") return null;
  return { backdropFilter: DOCK_BLUR, WebkitBackdropFilter: DOCK_BLUR } as ViewStyle;
}

/**
 * Apple-style frosted glass panel: translucent fill, hairline border,
 * top-edge highlight, and backdrop blur on web (translucency-only fallback on native).
 */
export default function GlassView({
  children,
  style,
  strong = false,
  deep = false,
  corner = 24,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  strong?: boolean;
  deep?: boolean;
  corner?: number;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        deep ? styles.deep : styles.base,
        {
          backgroundColor: strong ? colors.glassFillStrong : colors.glassFill,
          borderColor: colors.glassBorder,
          borderRadius: corner,
        },
        // Backdrop blur is web-only; native falls back to translucency.
        Platform.OS === "web" ? webBlurStyle() : null,
        style,
      ]}
    >
      <View pointerEvents="none" style={[styles.highlight, { borderRadius: corner }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  deep: {
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
});
