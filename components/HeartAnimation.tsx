import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface HeartAnimationProps {
  visible: boolean;
  onComplete?: () => void;
}

export default function HeartAnimation({ visible, onComplete }: HeartAnimationProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.2, duration: 200, easing: Easing.out(Easing.back(2)), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 400, delay: 300, useNativeDriver: true }),
        ]),
      ]).start(() => onComplete?.());
    }
  }, [visible]);

  return (
    <Animated.Text
      style={{
        position: "absolute",
        top: "40%",
        left: "35%",
        fontSize: 100,
        color: "#EC4899",
        opacity,
        transform: [{ scale }],
        zIndex: 100,
        textShadowColor: "rgba(236, 72, 153, 0.6)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
      }}
    >
      ❤
    </Animated.Text>
  );
}
