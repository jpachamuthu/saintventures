import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Minimal praying-hands mark in the lucide line style:
 * two hands pressed together, fingertips meeting at the top.
 */
export default function PrayingHands({ size = 14, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M7.5 20 C7.5 13 8.5 8 11.7 4.3" />
      <Path d="M16.5 20 C16.5 13 15.5 8 12.3 4.3" />
      <Path d="M12 6.5 L12 20" />
      <Path d="M4.8 21 L7.5 20" />
      <Path d="M19.2 21 L16.5 20" />
    </Svg>
  );
}
