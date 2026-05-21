import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface ShimmerPlaceholderProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  className?: string;
}

export default function ShimmerPlaceholder({
  width,
  height,
  borderRadius = 12,
  className = "",
}: ShimmerPlaceholderProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[{ width: width as any, height: height as any, borderRadius }]}
      className={`bg-dark-600 ${className}`}
    />
  );
}
