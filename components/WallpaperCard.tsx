import { useRef } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { UnsplashPhoto } from "../types";
import { COLORS, BORDER_RADIUS } from "../constants/theme";

interface WallpaperCardProps {
  photo: UnsplashPhoto;
  onPress: (photo: UnsplashPhoto) => void;
  onLike: (photoId: string) => void;
  isFav?: boolean;
}

export default function WallpaperCard({
  photo,
  onPress,
  onLike,
  isFav = false,
}: WallpaperCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(photo)}
        onLongPress={() => onLike(photo.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="rounded-2xl overflow-hidden relative"
        style={{
          backgroundColor: "rgba(20, 20, 40, 0.7)",
          borderWidth: 1,
          borderColor: isFav ? "rgba(139, 92, 246, 0.4)" : "rgba(120, 80, 255, 0.12)",
          shadowColor: isFav ? "#8B5CF6" : "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: isFav ? 0.5 : 0,
          shadowRadius: 15,
          elevation: isFav ? 8 : 0,
        }}
      >
        <Image
          source={{ uri: photo.urls.small }}
          style={{ width: "100%", aspectRatio: photo.width / photo.height, borderRadius: BORDER_RADIUS["2xl"] }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          placeholder={{ blurhash: photo.blur_hash }}
        />
        <Animated.View
          className="absolute inset-0 rounded-2xl"
          style={{
            borderWidth: 1,
            borderColor: "rgba(139, 92, 246, 0.3)",
            opacity: glowOpacity,
          }}
          pointerEvents="none"
        />
        <View className="absolute inset-x-0 bottom-0 p-3 rounded-b-2xl" style={{ backgroundColor: "rgba(10, 10, 15, 0.7)", backdropFilter: "blur(10px)" }}>
          <Text className="text-purple-200 text-xs font-semibold tracking-wide" numberOfLines={1}>
            {photo.user.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onLike(photo.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full items-center justify-center"
          style={{ backgroundColor: isFav ? "rgba(139, 92, 246, 0.3)" : "rgba(0,0,0,0.4)" }}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={17}
            color={isFav ? "#EC4899" : "white"}
          />
        </TouchableOpacity>
        <View className="absolute top-3 left-3 px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(139, 92, 246, 0.3)" }}>
          <View className="flex-row items-center gap-1">
            <Ionicons name="sparkles" size={9} color="#A78BFA" />
            <Text className="text-purple-300 text-[9px] font-bold tracking-wider">AI</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
