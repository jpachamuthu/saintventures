import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { theme } from "../theme";

type LogoMarkProps = { size: number };

export function LogoMark({ size }: LogoMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="28"
        fill={theme.colors.bgCard}
        stroke={theme.colors.ring}
        strokeWidth="3"
      />
      <Circle cx="60" cy="60" r="38" stroke={theme.colors.gold} strokeWidth="3.5" fill="none" opacity="0.9" />
      <Circle cx="60" cy="60" r="38" stroke={theme.colors.gold} strokeWidth="11" fill="none" opacity="0.14" />

      <Circle cx="60" cy="50" r="11" fill={theme.colors.goldBright} />
      <Path
        d="M60 61 Q70 65 74 77 Q76 85 74 92 L46 92 Q44 85 46 77 Q50 65 60 61 Z"
        fill={theme.colors.gold}
        opacity="0.92"
      />

      <Circle cx="60" cy="50" r="21" stroke={theme.colors.goldBright} strokeWidth="2.2" fill="none" opacity="0.75" />

      <Path
        d="M60 22 L62.4 31.2 L71.6 33.6 L62.4 36 L60 45.2 L57.6 36 L48.4 33.6 L57.6 31.2 Z"
        fill={theme.colors.goldBright}
        opacity="0.95"
      />
      <Circle cx="84" cy="40" r="2" fill={theme.colors.goldBright} opacity="0.7" />
      <Circle cx="86" cy="84" r="2.2" fill={theme.colors.goldBright} opacity="0.6" />
      <Circle cx="36" cy="82" r="1.8" fill={theme.colors.goldBright} opacity="0.6" />
    </Svg>
  );
}

type LogoProps = {
  size?: number;
  withTagline?: boolean;
  tagline?: string;
};

export default function Logo({ size = 120, withTagline = true, tagline = "Big stories for little hearts" }: LogoProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <LogoMark size={size} />
      <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 18 }}>
        <Text style={{ fontFamily: theme.fonts.displayBold, fontSize: 40, color: theme.colors.cream }}>
          Saint
        </Text>
        <Text style={{ fontFamily: theme.fonts.displayBold, fontSize: 40, color: theme.colors.gold }}>
          Ventures
        </Text>
      </View>
      {withTagline ? (
        <Text
          style={{
            fontFamily: theme.fonts.displayItalic,
            fontSize: 17,
            color: theme.colors.muted,
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
