import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ width: width as any, height: height as any, borderRadius, opacity }]}
      className={`bg-dark-600 ${className}`}
    />
  );
}
