import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const COLORS = ["#F6C14D", "#F26D85", "#6FD0E8", "#7BC86B", "#B78BF0", "#FFB3C7"];
const PARTICLES = 18;

type FireworksProps = {
  trigger: number;
  style?: object;
};

export default function Fireworks({ trigger, style }: FireworksProps) {
  const progress = useRef(new Animated.Value(0)).current;

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES }, (_, i) => {
        const angle = (Math.PI * 2 * i) / PARTICLES + Math.random() * 0.5;
        const dist = 60 + Math.random() * 90;
        return {
          color: COLORS[i % COLORS.length],
          size: 5 + Math.random() * 6,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 40,
          delay: Math.random() * 140,
        };
      }),
    // regenerate particles per burst
    [trigger]
  );

  useEffect(() => {
    if (!trigger) return;
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: 950,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    });
    const anim2 = Animated.timing(progress, {
      toValue: 1,
      duration: 950,
      delay: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    });
    anim.start(() => anim2.start());
  }, [trigger, progress]);

  if (!trigger) return null;

  return (
    <View pointerEvents="none" style={[styles.container, style]}>
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              opacity: progress.interpolate({
                inputRange: [0, 0.15, 0.8, 1],
                outputRange: [0, 1, 1, 0],
              }),
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, p.dx],
                  }),
                },
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, p.dy],
                  }),
                },
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1.1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  particle: {
    position: "absolute",
  },
});
