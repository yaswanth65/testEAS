import { useRef } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { UnsplashPhoto } from "../types";
import { BORDER_RADIUS } from "../constants/theme";

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
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    Animated.timing(glow, { toValue: 0, duration: 150, useNativeDriver: false }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 12 }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(photo)}
        onLongPress={() => onLike(photo.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "rgba(20, 20, 40, 0.7)",
          borderWidth: 1,
          borderColor: isFav ? "rgba(139, 92, 246, 0.4)" : "rgba(120, 80, 255, 0.12)",
        }}
      >
        <Image
          source={{ uri: photo.urls.small }}
          style={{ width: "100%", aspectRatio: photo.width / photo.height }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          placeholder={{ blurhash: photo.blur_hash }}
        />
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: "rgba(10, 10, 15, 0.7)" }}>
          <Text style={{ color: "#D8CCF0", fontSize: 12, fontWeight: "600" }} numberOfLines={1}>
            {photo.user.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onLike(photo.id)}
          style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: isFav ? "rgba(139, 92, 246, 0.3)" : "rgba(0,0,0,0.4)" }}
        >
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={17} color={isFav ? "#EC4899" : "white"} />
        </TouchableOpacity>
        <View style={{ position: "absolute", top: 12, left: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.3)" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="sparkles" size={9} color="#A78BFA" />
            <Text style={{ color: "#C4B5FD", fontSize: 9, fontWeight: "bold", letterSpacing: 1 }}>AI</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
