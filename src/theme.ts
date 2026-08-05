export type ThemeMode = "dark" | "light";

export const palettes = {
  dark: {
    bg: "#0B0B1E",
    bgCard: "#121226",
    bgCardAlt: "#171732",
    gold: "#EF9E56",
    goldBright: "#F0AB6A",
    cream: "#FFFFFF",
    muted: "#B9AFC9",
    mutedDim: "#8B82A0",
    martyrRed: "#C94F4F",
    marianBlue: "#303080",
    ring: "#23234A",
    white: "#FFFFFF",
    onGold: "#2A1605",
    artGradient1: "#1A1A38",
    artGradient2: "#2A2A58",
  },
  light: {
    bg: "#FEF8E6",
    bgCard: "#FFFFFF",
    bgCardAlt: "#FEF1D6",
    gold: "#F0B000",
    goldBright: "#F6C14D",
    cream: "#5B2E0B",
    muted: "#7A6A50",
    mutedDim: "#9A8A70",
    martyrRed: "#B3452F",
    marianBlue: "#50B0A0",
    ring: "#EBD9B8",
    white: "#FFFFFF",
    onGold: "#3A2505",
    artGradient1: "#F3E6CE",
    artGradient2: "#E8D5AF",
  },
} as const;

export type ThemeColors = (typeof palettes)[ThemeMode];

export const fonts = {
  display: "CormorantGaramond_600SemiBold",
  displayBold: "CormorantGaramond_700Bold",
  displayItalic: "CormorantGaramond_500Medium_Italic",
  ui: "Quicksand_500Medium",
  uiMedium: "Quicksand_600SemiBold",
  uiBold: "Quicksand_700Bold",
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