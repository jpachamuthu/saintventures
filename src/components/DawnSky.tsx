import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Rect, Stop } from "react-native-svg";

/**
 * Full-bleed illustrated dawn backdrop: indigo sky, rising sun, soft clouds,
 * a distant glowing cathedral city, layered hills and frosted glass waves.
 */
const STARS: Array<[number, number, number, number]> = [
  [28, 60, 1.6, 0.8], [75, 140, 1.2, 0.5], [120, 45, 1.8, 0.9], [165, 110, 1.1, 0.45],
  [210, 55, 1.5, 0.75], [255, 130, 1.2, 0.5], [300, 70, 1.7, 0.85], [345, 150, 1.2, 0.5],
  [55, 210, 1.3, 0.55], [140, 190, 1.0, 0.4], [190, 240, 1.4, 0.6], [240, 200, 1.0, 0.4],
  [285, 250, 1.3, 0.55], [330, 220, 1.1, 0.45], [100, 270, 1.0, 0.35], [360, 300, 1.2, 0.4],
];

const WINDOWS: Array<[number, number]> = [
  [36, 596], [46, 606], [66, 578], [74, 592], [146, 588], [154, 600],
  [176, 558], [182, 572], [204, 592], [216, 602], [242, 610], [256, 612],
  [278, 584], [288, 596], [310, 598], [340, 590],
];

export default function DawnSky() {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width="100%"
      height="100%"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0D1440" />
          <Stop offset="0.38" stopColor="#27408F" />
          <Stop offset="0.55" stopColor="#7E63AC" />
          <Stop offset="0.66" stopColor="#E59A6B" />
          <Stop offset="0.74" stopColor="#F7D189" />
          <Stop offset="1" stopColor="#C98A5E" />
        </LinearGradient>
        <RadialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFF3CF" stopOpacity="0.95" />
          <Stop offset="0.45" stopColor="#FFE3A1" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#FFE3A1" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Rect x="0" y="0" width="390" height="844" fill="url(#dawnSky)" />

      {STARS.map(([x, y, r, o], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill="#FFFFFF" opacity={o} />
      ))}

      <Circle cx="195" cy="600" r="130" fill="url(#sunGlow)" />
      <Circle cx="195" cy="600" r="30" fill="#FFEDBE" opacity="0.95" />

      <G fill="#FFFFFF">
        <Ellipse cx="90" cy="430" rx="70" ry="16" opacity="0.18" />
        <Ellipse cx="280" cy="380" rx="90" ry="18" opacity="0.15" />
        <Ellipse cx="60" cy="330" rx="80" ry="14" opacity="0.10" />
        <Ellipse cx="320" cy="470" rx="60" ry="14" opacity="0.12" />
      </G>
      <Ellipse cx="200" cy="505" rx="120" ry="20" fill="#F7C9A0" opacity="0.22" />

      <G stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55">
        <Path d="M138 300 q6 -6 12 0 q6 -6 12 0" />
        <Path d="M224 332 q5 -5 10 0 q5 -5 10 0" />
      </G>

      {/* Distant cathedral city */}
      <G fill="#463482">
        <Rect x="30" y="588" width="26" height="40" />
        <Rect x="62" y="570" width="20" height="58" />
        <Rect x="104" y="560" width="12" height="22" />
        <Path d="M88 628 L88 600 A22 22 0 0 1 132 600 L132 628 Z" />
        <Rect x="140" y="580" width="24" height="48" />
        <Rect x="172" y="550" width="18" height="78" />
        <Path d="M172 550 L181 518 L190 550 Z" />
        <Rect x="198" y="584" width="30" height="44" />
        <Path d="M238 628 L238 606 A14 14 0 0 1 266 606 L266 628 Z" />
        <Rect x="274" y="576" width="22" height="52" />
        <Rect x="304" y="590" width="26" height="38" />
        <Rect x="336" y="582" width="20" height="46" />
        <Rect x="0" y="620" width="390" height="8" />
      </G>
      <G fill="#FFD98A" opacity="0.85">
        {WINDOWS.map(([x, y], i) => (
          <Rect key={i} x={x} y={y} width="3.5" height="5" rx="1" />
        ))}
      </G>

      {/* Layered hills */}
      <Path d="M0 660 C60 630 120 630 195 655 C270 680 330 665 390 640 L390 844 L0 844 Z" fill="#2A2F66" />
      <Path d="M0 720 C70 695 140 700 200 720 C270 742 330 735 390 710 L390 844 L0 844 Z" fill="#1C2352" />
      <Path d="M-20 700 C80 660 180 668 260 700 C320 724 360 722 410 705 L410 844 L-20 844 Z" fill="#FFFFFF" opacity="0.08" />
      <Path d="M0 790 C80 770 160 775 230 795 C300 815 350 808 390 795 L390 844 L0 844 Z" fill="#141A40" />
      <Path d="M-20 762 C90 726 190 733 270 763 C330 785 370 781 410 766 L410 844 L-20 844 Z" fill="#FFFFFF" opacity="0.06" />
    </Svg>
  );
}
