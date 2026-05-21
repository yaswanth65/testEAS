import { Dimensions, Text, View } from "react-native";
import { Image } from "expo-image";
import { Sparkles } from "lucide-react-native";
import { BORDER_RADIUS } from "../constants/theme";
import type { UnsplashPhoto } from "../types";

interface HeroBannerProps {
  photo: UnsplashPhoto | null;
}

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 200;

export default function HeroBanner({ photo }: HeroBannerProps) {
  if (!photo) return null;

  return (
    <View className="px-4 mb-4">
      <View className="rounded-2xl overflow-hidden relative" style={{ height: BANNER_HEIGHT }}>
        <Image
          source={{ uri: photo.urls.regular }}
          style={{ width: "100%", height: BANNER_HEIGHT }}
          contentFit="cover"
          transition={500}
          cachePolicy="memory-disk"
          placeholder={{ blurhash: photo.blur_hash }}
        />
        <View className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />
        <View className="absolute bottom-4 left-4 right-4">
          <View className="flex-row items-center gap-2 mb-1">
            <Sparkles size={16} color="#38BDF8" />
            <Text className="text-accent-300 text-xs font-semibold uppercase tracking-wider">
              Featured
            </Text>
          </View>
          <Text className="text-white text-xl font-bold" numberOfLines={1}>
            {photo.alt_description || "AI Wallpaper Gallery"}
          </Text>
          <Text className="text-dark-100 text-sm mt-1">
            Photo by {photo.user.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
