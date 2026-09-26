import React from "react";
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "./ThemeContext";

/**
 * Apple-style frosted glass panel: translucent fill, hairline border,
 * top-edge highlight, and backdrop blur on web (translucency-only fallback on native).
 */
export default function GlassView({
  children,
  style,
  strong = false,
  corner = 24,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  strong?: boolean;
  corner?: number;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: strong ? colors.glassFillStrong : colors.glassFill,
          borderColor: colors.glassBorder,
          borderRadius: corner,
        },
        // Backdrop blur is web-only; native falls back to translucency.
        Platform.OS === "web"
          ? ({ backdropFilter: "blur(22px) saturate(1.5)", WebkitBackdropFilter: "blur(22px) saturate(1.5)" } as ViewStyle)
          : null,
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
  highlight: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
});
