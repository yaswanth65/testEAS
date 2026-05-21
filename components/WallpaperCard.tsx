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

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(photo)}
        onLongPress={() => onLike(photo.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="rounded-xl overflow-hidden relative"
      >
        <Image
          source={{ uri: photo.urls.small }}
          style={{
            width: "100%",
            aspectRatio: photo.width / photo.height,
            borderRadius: BORDER_RADIUS.lg,
          }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          placeholder={{ blurhash: photo.blur_hash }}
        />
        <View className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <Text className="text-white text-sm font-semibold" numberOfLines={1}>
            {photo.user.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onLike(photo.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 items-center justify-center"
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={16}
            color={isFav ? COLORS.error : "white"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
