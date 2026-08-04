import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type Palette = "gold" | "dawn" | "sea" | "ember";

const PALETTES: Record<Palette, [string, string, string]> = {
  gold: ["#4A3320", "#6B4A28", "#E8B54D"],
  dawn: ["#2E2440", "#5A4468", "#E7B8D4"],
  sea: ["#16303A", "#2C5464", "#7FC4C9"],
  ember: ["#3A1E14", "#6B2E1E", "#E08A4F"],
};

type SaintIllustrationProps = {
  palette?: Palette;
  height?: number;
  children?: React.ReactNode;
};

export default function SaintIllustration({ palette = "gold", height = 180, children }: SaintIllustrationProps) {
  const [c1, c2, c3] = PALETTES[palette];

  return (
    <View style={[styles.root, { height, backgroundColor: "transparent" }]}>
      <View style={[styles.gradient, { backgroundColor: c1 }]}>
        <Svg width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => (
            <Circle
              key={i}
              cx={(i * 53) % 400}
              cy={(i * 97) % 180}
              r={i % 4 === 0 ? 1.6 : 0.8}
              fill="#FFFFFF"
              opacity={0.35}
            />
          ))}
          <Circle cx="200" cy="120" r="68" stroke={c3} strokeWidth="3" fill="none" opacity={0.55} />
          <Circle cx="200" cy="120" r="68" stroke={c3} strokeWidth="10" fill="none" opacity={0.12} />
          <Path
            d="M200 90 Q225 100 232 150 Q236 190 232 230 L168 230 Q164 190 168 150 Q175 100 200 90 Z"
            fill={c3}
            opacity={0.85}
          />
          <Circle cx="200" cy="78" r="18" fill={c3} opacity={0.9} />
        </Svg>
      </View>
      {children ? <View style={StyleSheet.absoluteFill}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
});
