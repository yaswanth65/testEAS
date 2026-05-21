import { View } from "react-native";
import type { ReactNode } from "react";

interface NeonBorderProps {
  children: ReactNode;
  color?: string;
  width?: number;
  borderRadius?: number;
  className?: string;
}

export default function NeonBorder({
  children,
  color = "#8B5CF6",
  width = 1,
  borderRadius = 16,
  className = "",
}: NeonBorderProps) {
  return (
    <View
      className={className}
      style={{
        borderRadius,
        borderWidth: width,
        borderColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {children}
    </View>
  );
}
