import React from "react";
import { Text, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Line,
  Path,
  Stop,
} from "react-native-svg";
import { fonts } from "../theme";
import { useTheme } from "./ThemeContext";

type LogoMarkProps = { size: number };

const RAYS: Array<[number, number, number, number]> = [
  [162, 100, 200, 100],
  [153.7, 131, 186.6, 150],
  [131, 153.7, 150, 186.6],
  [100, 162, 100, 200],
  [69, 153.7, 50, 186.6],
  [46.3, 131, 13.4, 150],
  [38, 100, 0, 100],
  [46.3, 69, 13.4, 50],
  [69, 46.3, 50, 13.4],
  [100, 38, 100, 0],
  [131, 46.3, 150, 13.4],
  [153.7, 69, 186.6, 50],
];

export function LogoMark({ size }: LogoMarkProps) {
  const { colors } = useTheme();
  const gold = colors.gold;
  const goldBright = colors.goldBright;
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#1A1A38" />
          <Stop offset="1" stopColor="#0E0E26" />
        </LinearGradient>
        <ClipPath id="sunclip">
          <Circle cx="100" cy="100" r="92" />
        </ClipPath>
      </Defs>

      <Circle cx="100" cy="100" r="92" fill="url(#logoGrad)" stroke={gold} strokeWidth="3" />

      <G clipPath="url(#sunclip)" stroke={gold} strokeWidth="5" strokeLinecap="round" opacity="0.45">
        {RAYS.map(([x1, y1, x2, y2], i) => (
          <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </G>

      <Circle cx="100" cy="84" r="21" fill="none" stroke={gold} strokeWidth="3.5" />
      <Circle cx="100" cy="84" r="21" fill="none" stroke={gold} strokeWidth="9" opacity="0.18" />

      <Circle cx="100" cy="84" r="15" fill="#3A2A22" />
      <Path d="M100 96 C84 102 76 122 76 158 L124 158 C124 122 116 102 100 96 Z" fill="#3A2A22" />
      <Path
        d="M98 128 L102 128 L102 138 L112 138 L112 142 L102 142 L102 152 L98 152 L98 142 L88 142 L88 138 L98 138 Z"
        fill={gold}
      />
      <Path
        d="M160 34 L161.6 44.4 L172 46 L161.6 47.6 L160 58 L158.4 47.6 L148 46 L158.4 44.4 Z"
        fill={goldBright}
      />
    </Svg>
  );
}

type LogoProps = {
  size?: number;
  withTagline?: boolean;
  tagline?: string;
};

export default function Logo({ size = 120, withTagline = true, tagline = "Big stories for little hearts" }: LogoProps) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: "center" }}>
      <LogoMark size={size} />
      <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 18 }}>
        <Text style={{ fontFamily: fonts.displayBold, fontSize: 40, color: colors.cream }}>
          Saint
        </Text>
        <Text style={{ fontFamily: fonts.displayBold, fontSize: 40, color: colors.gold }}>
          Ventures
        </Text>
      </View>
      {withTagline ? (
        <Text
          style={{
            fontFamily: fonts.displayItalic,
            fontSize: 17,
            color: colors.muted,
            marginTop: 6,
            letterSpacing: 0.2,
          }}
        >
          {tagline}
        </Text>
      ) : null}
    </View>
  );
}
