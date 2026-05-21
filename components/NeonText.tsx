import { Text } from "react-native";

interface NeonTextProps {
  children: string;
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  glow?: boolean;
}

const sizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
  "2xl": "text-xl",
};

export default function NeonText({
  children,
  className = "",
  color,
  size = "md",
  glow = true,
}: NeonTextProps) {
  return (
    <Text
      className={`font-bold tracking-wide ${sizeMap[size]} ${className}`}
      style={{
        color: color || "#8B5CF6",
        textShadowColor: glow ? (color || "#8B5CF6") : "transparent",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: glow ? 10 : 0,
      }}
    >
      {children}
    </Text>
  );
}
