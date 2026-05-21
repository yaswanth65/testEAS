export const COLORS = {
  background: "#0A0A0A",
  surface: "#1E1E1E",
  surfaceLight: "#2A2A2A",
  card: "#121212",
  border: "#383838",
  text: "#FFFFFF",
  textSecondary: "#A8A8A8",
  textTertiary: "#707070",
  accent: "#0EA5E9",
  accentLight: "#38BDF8",
  accentDark: "#0284C7",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const CATEGORIES = [
  { id: "1", title: "Trending", slug: "trending" },
  { id: "2", title: "Nature", slug: "nature" },
  { id: "3", title: "City", slug: "city" },
  { id: "4", title: "Abstract", slug: "abstract" },
  { id: "5", title: "Technology", slug: "technology" },
  { id: "6", title: "Space", slug: "space" },
  { id: "7", title: "Architecture", slug: "architecture" },
  { id: "8", title: "Animals", slug: "animals" },
] as const;
