import { useRef } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Heart } from "lucide-react-native";
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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const aspectRatio = photo.width / photo.height;
  const cardHeight = 300 * aspectRatio;

  return (
    <Animated.View style={animatedStyle} className="mb-3">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(photo)}
        onLongPress={() => onLike(photo.id)}
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
          <Text
            className="text-white text-sm font-semibold"
            numberOfLines={1}
          >
            {photo.user.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onLike(photo.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 items-center justify-center"
        >
          <Heart
            size={16}
            color={isFav ? COLORS.error : "white"}
            fill={isFav ? COLORS.error : "transparent"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
