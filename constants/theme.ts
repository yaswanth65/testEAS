export const COLORS = {
  background: "#0A0A0F",
  surface: "rgba(30, 30, 50, 0.6)",
  surfaceLight: "rgba(40, 40, 70, 0.5)",
  card: "rgba(20, 20, 40, 0.7)",
  border: "rgba(120, 80, 255, 0.2)",
  text: "#FFFFFF",
  textSecondary: "#C4B5FD",
  textTertiary: "#8B8BA0",
  accent: "#8B5CF6",
  accentLight: "#A78BFA",
  accentDark: "#6D28D9",
  neonBlue: "#3B82F6",
  neonPurple: "#8B5CF6",
  neonPink: "#EC4899",
  neonCyan: "#06B6D4",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassHighlight: "rgba(255, 255, 255, 0.05)",
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
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

export const GRADIENTS = {
  primary: ["#8B5CF6", "#3B82F6"] as const,
  secondary: ["#EC4899", "#8B5CF6"] as const,
  accent: ["#06B6D4", "#3B82F6"] as const,
  dark: ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.9)"] as const,
} as const;

export const CATEGORIES = [
  { id: "1", title: "✦ Trending", slug: "trending" },
  { id: "2", title: "✦ Neon", slug: "neon" },
  { id: "3", title: "✦ Cyber", slug: "cyber" },
  { id: "4", title: "✦ Abstract", slug: "abstract" },
  { id: "5", title: "✦ Glitch", slug: "glitch" },
  { id: "6", title: "✦ Synthwave", slug: "synthwave" },
  { id: "7", title: "✦ Dark", slug: "dark" },
  { id: "8", title: "✦ Vortex", slug: "vortex" },
] as const;
