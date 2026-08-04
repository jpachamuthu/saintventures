import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import type { ArtVariant, StoryPalette } from "../data/stories";

const PALETTES: Record<StoryPalette, [string, string, string]> = {
  gold: ["#4A3320", "#6B4A28", "#E8B54D"],
  dawn: ["#2E2440", "#5A4468", "#E7B8D4"],
  sea: ["#16303A", "#2C5464", "#7FC4C9"],
  ember: ["#3A1E14", "#6B2E1E", "#E08A4F"],
  azure: ["#14283A", "#2E5470", "#8FB6D9"],
  forest: ["#1F2A1C", "#3A4A2E", "#A8C27A"],
  rose: ["#3A1E2A", "#5A2E42", "#E8A7C0"],
};

const WHITE = "#FFFFFF";

type SaintIllustrationProps = {
  palette?: StoryPalette;
  art?: ArtVariant;
  height?: number;
  children?: React.ReactNode;
};

function SaintArt({ variant, c3 }: { variant: ArtVariant; c3: string }) {
  switch (variant) {
    case "sword":
      return (
        <>
          <Path d="M200 36 L214 58 L207 58 L207 150 L193 150 L193 58 L186 58 Z" fill={c3} opacity={0.92} />
          <Path d="M200 40 L246 50 L200 60 Z" fill={WHITE} opacity={0.85} />
          <Rect x="182" y="150" width="36" height="9" rx="3" fill={c3} opacity={0.9} />
          <Rect x="193" y="159" width="14" height="30" rx="5" fill={c3} opacity={0.7} />
          <Circle cx="200" cy="196" r="6" fill={c3} />
          <Circle cx="162" cy="70" r="3" fill={WHITE} opacity={0.9} />
          <Circle cx="238" cy="34" r="2.4" fill={WHITE} opacity={0.9} />
          <Circle cx="150" cy="120" r="2" fill={WHITE} opacity={0.6} />
          <Circle cx="252" cy="100" r="2.6" fill={WHITE} opacity={0.7} />
        </>
      );
    case "lamp":
      return (
        <>
          <Path d="M200 0 L200 62" stroke={c3} strokeWidth="3" opacity={0.55} />
          <Circle cx="200" cy="118" r="40" fill={WHITE} opacity={0.12} />
          <Circle cx="200" cy="118" r="26" fill={WHITE} opacity={0.1} />
          <Path
            d="M184 62 H216 A11 11 0 0 1 227 73 V104 A11 11 0 0 1 216 115 H184 A11 11 0 0 1 173 104 V73 A11 11 0 0 1 184 62 Z"
            fill={c3}
            opacity={0.92}
          />
          <Path d="M200 70 Q211 82 200 102 Q189 82 200 70 Z" fill={WHITE} opacity={0.95} />
          <Circle cx="200" cy="132" r="8" fill={c3} opacity={0.85} />
          <Path d="M200 140 V152" stroke={c3} strokeWidth="3" opacity={0.7} />
          <Circle cx="160" cy="86" r="2.6" fill={WHITE} opacity={0.8} />
          <Circle cx="242" cy="92" r="2.2" fill={WHITE} opacity={0.8} />
        </>
      );
    case "rosary":
      return (
        <>
          <Circle cx="200" cy="132" r="58" fill="none" stroke={c3} strokeWidth="7" strokeLinecap="round" opacity={0.9} />
          <Circle cx="200" cy="74" r="9" fill={WHITE} opacity={0.14} />
          <Circle cx="200" cy="74" r="4" fill={WHITE} opacity={0.5} />
          <Rect x="196" y="140" width="8" height="28" rx="2.5" fill={c3} />
          <Rect x="189" y="146" width="22" height="8" rx="2.5" fill={c3} />
          <Circle cx="142" cy="132" r="2.4" fill={WHITE} opacity={0.7} />
          <Circle cx="258" cy="132" r="2.4" fill={WHITE} opacity={0.7} />
          <Circle cx="200" cy="192" r="2.4" fill={WHITE} opacity={0.7} />
        </>
      );
    case "birds":
      return (
        <>
          <Path d="M148 92 C154 82 162 82 168 92 C162 88 154 88 148 92 Z" fill={WHITE} opacity={0.9} />
          <Path d="M214 66 C222 54 232 54 240 66 C232 61 222 61 214 66 Z" fill={WHITE} opacity={0.8} />
          <Path d="M252 118 C258 108 266 108 272 118 C266 114 258 114 252 118 Z" fill={WHITE} opacity={0.7} />
          <Path d="M138 150 C142 142 148 142 152 150 C148 147 142 147 138 150 Z" fill={WHITE} opacity={0.6} />
          <Circle cx="176" cy="200" r="2" fill={WHITE} opacity={0.7} />
          <Circle cx="232" cy="170" r="2" fill={WHITE} opacity={0.6} />
          <Circle cx="246" cy="90" r="2" fill={WHITE} opacity={0.6} />
        </>
      );
    case "rose":
      return (
        <>
          <Path d="M200 170 V218" stroke={c3} strokeWidth="4" opacity={0.75} />
          <Path d="M200 196 Q186 186 178 196 Q190 202 200 196 Z" fill={c3} opacity={0.85} />
          <Path d="M200 208 Q214 198 222 208 Q210 214 200 208 Z" fill={c3} opacity={0.85} />
          <Circle cx="200" cy="138" r="30" fill={c3} opacity={0.88} />
          <Circle cx="200" cy="138" r="19" fill={c3} opacity={0.95} />
          <Circle cx="200" cy="138" r="9" fill={WHITE} opacity={0.85} />
          <Path d="M188 130 Q200 122 212 130 Q202 140 188 130 Z" fill={WHITE} opacity={0.5} />
          <Circle cx="150" cy="120" r="3" fill={c3} opacity={0.9} />
          <Circle cx="248" cy="150" r="2.4" fill={c3} opacity={0.8} />
          <Circle cx="170" cy="178" r="2.2" fill={c3} opacity={0.8} />
          <Circle cx="234" cy="112" r="2" fill={c3} opacity={0.8} />
          <Circle cx="196" cy="56" r="2" fill={WHITE} opacity={0.7} />
        </>
      );
    case "saint":
    default:
      return (
        <>
          <Path
            d="M200 90 Q225 100 232 150 Q236 190 232 230 L168 230 Q164 190 168 150 Q175 100 200 90 Z"
            fill={c3}
            opacity={0.85}
          />
          <Circle cx="200" cy="78" r="18" fill={c3} opacity={0.9} />
        </>
      );
  }
}

export default function SaintIllustration({ palette = "gold", art = "saint", height = 180, children }: SaintIllustrationProps) {
  const [c1, c2, c3] = PALETTES[palette];

  return (
    <View style={[styles.root, { height, backgroundColor: "transparent" }]}>
      <View style={[styles.gradient, { backgroundColor: c1 }]}>
        <View style={[styles.aurora, { backgroundColor: c2, opacity: 0.5 }]} />
        <Svg width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => (
            <Circle
              key={i}
              cx={(i * 53) % 400}
              cy={(i * 97) % 180}
              r={i % 4 === 0 ? 1.6 : 0.8}
              fill={WHITE}
              opacity={0.35}
            />
          ))}
          <Circle cx="200" cy="120" r="68" stroke={c3} strokeWidth="3" fill="none" opacity={0.55} />
          <Circle cx="200" cy="120" r="68" stroke={c3} strokeWidth="10" fill="none" opacity={0.12} />
          <SaintArt variant={art} c3={c3} />
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
  aurora: {
    position: "absolute",
    top: -60,
    right: -70,
    width: 260,
    height: 260,
    borderRadius: 130,
  },
});
