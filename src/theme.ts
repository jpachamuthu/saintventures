export type ThemeMode = "dark" | "light";

export const palettes = {
  dark: {
    bg: "#12173A",
    bgCard: "#1B2150",
    bgCardAlt: "#232B63",
    gold: "#F5C451",
    goldBright: "#F0AB6A",
    goldGradStart: "#F9D06C",
    goldGradEnd: "#E3A63C",
    cta: "#F6DA96",
    cream: "#FFFFFF",
    muted: "#B9AFC9",
    mutedDim: "#8B82A0",
    martyrRed: "#C94F4F",
    marianBlue: "#303080",
    ring: "#2C3568",
    white: "#FFFFFF",
    onGold: "#2A1605",
    success: "#7BD9A0",
    artGradient1: "#1A1A38",
    artGradient2: "#2A2A58",
    glassFill: "rgba(255, 255, 255, 0.10)",
    glassFillStrong: "rgba(255, 255, 255, 0.16)",
    glassBorder: "rgba(255, 255, 255, 0.22)",
  },
  light: {
    bg: "#FFF9EF",
    bgCard: "#FFFFFF",
    bgCardAlt: "#FFF1DC",
    gold: "#EF9E56",
    goldBright: "#F0AB6A",
    goldGradStart: "#F4AF55",
    goldGradEnd: "#DE8C38",
    cta: "#F6DA96",
    cream: "#2B3055",
    muted: "#6D748F",
    mutedDim: "#9AA0B8",
    martyrRed: "#FF7A59",
    marianBlue: "#EF9E56",
    ring: "#F0E4D2",
    white: "#FFFFFF",
    onGold: "#2A1605",
    success: "#8FE3B0",
    artGradient1: "#FFF3DC",
    artGradient2: "#FFE6C2",
    glassFill: "rgba(255, 255, 255, 0.55)",
    glassFillStrong: "rgba(255, 255, 255, 0.72)",
    glassBorder: "rgba(255, 255, 255, 0.9)",
  },
} as const;

export type ThemeColors = (typeof palettes)[ThemeMode];

export const fonts = {
  display: "Baloo2_600SemiBold",
  displayBold: "Fredoka_700Bold",
  displayItalic: "Baloo2_600SemiBold",
  serif: "CormorantGaramond_600SemiBold",
  serifBold: "CormorantGaramond_700Bold",
  card: "Baloo2_600SemiBold",
  ui: "Nunito_400Regular",
  uiMedium: "Nunito_600SemiBold",
  uiBold: "Fredoka_600SemiBold",
  metaBold: "Nunito_700Bold",
};

export const radius = {
  card: 18,
  pill: 999,
};

/** Default (dark) palette for components that render before the provider is ready. */
export const theme = {
  colors: palettes.dark,
  fonts,
  radius,
};