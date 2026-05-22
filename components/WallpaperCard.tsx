import { useState, useRef, useCallback } from "react";
import { TouchableOpacity, Text, View, Animated, GestureResponderEvent } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import HeartAnimation from "./HeartAnimation";
import type { UnsplashPhoto } from "../types";

interface WallpaperCardProps {
  photo: UnsplashPhoto;
  onPress: (photo: UnsplashPhoto) => void;
  onLike: (photoId: string) => void;
  isFav?: boolean;
}

export default function WallpaperCard({ photo, onPress, onLike, isFav = false }: WallpaperCardProps) {
  const [showHeart, setShowHeart] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const lastTap = useRef(0);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleDoubleTap = useCallback((e: GestureResponderEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setShowHeart(true);
      onLike(photo.id);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }, [photo.id, onLike]);

  const handleHeartComplete = () => setShowHeart(false);

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 12 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(photo)}
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
        {/* Header - user info like Instagram */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}>
          <Image
            source={{ uri: photo.user.profile_image.small }}
            style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: "rgba(139,92,246,0.3)" }}
            contentFit="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }} numberOfLines={1}>{photo.user.name}</Text>
            <Text style={{ color: "#8B8BA0", fontSize: 10 }}>@{photo.user.username}</Text>
          </View>
          <TouchableOpacity style={{ padding: 4 }}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#8B8BA0" />
          </TouchableOpacity>
        </View>

        {/* Image with double-tap */}
        <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap} delayPressIn={0}>
          <Image
            source={{ uri: photo.urls.small }}
            style={{ width: "100%", aspectRatio: photo.width / photo.height }}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            placeholder={{ blurhash: photo.blur_hash }}
          />
          <HeartAnimation visible={showHeart} onComplete={handleHeartComplete} />
        </TouchableOpacity>

        {/* Action bar - like Instagram */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10, gap: 14 }}>
          <TouchableOpacity onPress={() => onLike(photo.id)}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={26} color={isFav ? "#EC4899" : "#FFFFFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="paper-plane-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Likes count */}
        <View style={{ paddingHorizontal: 12, paddingBottom: 4 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}>{photo.likes.toLocaleString()} likes</Text>
        </View>

        {/* Caption */}
        <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
          <Text style={{ color: "#D8CCF0", fontSize: 13 }} numberOfLines={2}>
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>{photo.user.username} </Text>
            {photo.alt_description || "Cyberpunk AI generated wallpaper"}
          </Text>
        </View>

        {/* AI badge */}
        <View style={{ position: "absolute", top: 52, right: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.3)" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="sparkles" size={9} color="#A78BFA" />
            <Text style={{ color: "#C4B5FD", fontSize: 9, fontWeight: "bold", letterSpacing: 1 }}>AI</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
