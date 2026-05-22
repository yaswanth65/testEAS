import { View } from "react-native";
import type { ReactNode } from "react";

interface NeonBorderProps {
  children: ReactNode;
  color?: string;
  width?: number;
  borderRadius?: number;
  style?: any;
}

export default function NeonBorder({
  children,
  color = "#8B5CF6",
  width = 1,
  borderRadius = 16,
  style,
}: NeonBorderProps) {
  return (
    <View
      style={[{
        borderRadius,
        borderWidth: width,
        borderColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
      }, style]}
    >
      {children}
    </View>
  );
}
