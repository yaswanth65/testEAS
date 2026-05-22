import { View } from "react-native";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  glowColor?: string;
  style?: any;
}

export default function GlassCard({ children, glowColor, style }: GlassCardProps) {
  return (
    <View
      style={[{
        borderRadius: 16,
        backgroundColor: "rgba(20, 20, 40, 0.7)",
        borderWidth: 1,
        borderColor: "rgba(120, 80, 255, 0.15)",
        ...(glowColor ? {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 10,
        } : {}),
      }, style]}
    >
      {children}
    </View>
  );
}
