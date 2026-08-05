import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native";
import { useTheme } from "./ThemeContext";

type AnimatedHeartButtonProps = {
  active: boolean;
  onPress: () => void;
  size?: number;
  style?: object;
};

/**
 * Heart button that pops (scales in) once when it becomes active.
 */
export default function AnimatedHeartButton({
  active,
  onPress,
  size = 15,
  style,
}: AnimatedHeartButtonProps) {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(active ? 1 : 0.85)).current;
  const prev = useRef(active);

  useEffect(() => {
    if (active && !prev.current) {
      scale.setValue(0.6);
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 220,
        useNativeDriver: true,
      }).start();
    } else if (!active) {
      scale.setValue(0.85);
    }
    prev.current = active;
  }, [active, scale]);

  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation();
        onPress();
      }}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={active ? "Remove from favourites" : "Add to favourites"}
      style={[styles.touch, style]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Heart
          size={size}
          color={active ? colors.gold : colors.cream}
          fill={active ? colors.gold : "transparent"}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touch: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});