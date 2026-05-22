import { Text } from "react-native";

interface NeonTextProps {
  children: string;
  style?: any;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  glow?: boolean;
}

const sizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

export default function NeonText({
  children,
  style,
  color,
  size = "md",
  glow = true,
}: NeonTextProps) {
  return (
    <Text
      style={[{
        fontWeight: "bold",
        letterSpacing: 0.5,
        fontSize: sizeMap[size],
        color: color || "#8B5CF6",
        textShadowColor: glow ? (color || "#8B5CF6") : "transparent",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: glow ? 10 : 0,
      }, style]}
    >
      {children}
    </Text>
  );
}
