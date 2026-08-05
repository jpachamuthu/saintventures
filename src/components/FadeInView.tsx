import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type FadeInViewProps = {
  children: React.ReactNode;
  style?: object;
  duration?: number;
  delay?: number;
};

/** Fades + slides its children in once on mount. */
export default function FadeInView({ children, style, duration = 320, delay = 0 }: FadeInViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const anim = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]);
    anim.start();
    return () => anim.stop();
  }, [opacity, translateY, duration, delay]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}