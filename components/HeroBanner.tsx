import { Dimensions, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { UnsplashPhoto } from "../types";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 220;

interface HeroBannerProps {
  photo: UnsplashPhoto | null;
}

export default function HeroBanner({ photo }: HeroBannerProps) {
  if (!photo) return null;

  return (
    <View className="px-4 mb-4">
      <View
        className="rounded-2xl overflow-hidden relative"
        style={{
          height: BANNER_HEIGHT,
          borderWidth: 1,
          borderColor: "rgba(120, 80, 255, 0.15)",
          shadowColor: "#8B5CF6",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        <Image
          source={{ uri: photo.urls.regular }}
          style={{ width: "100%", height: BANNER_HEIGHT }}
          contentFit="cover"
          transition={500}
          cachePolicy="memory-disk"
          placeholder={{ blurhash: photo.blur_hash }}
        />
        <View
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(10, 10, 15, 0.3)" }}
        />
        <View
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{ backgroundColor: "rgba(10, 10, 15, 0.6)" }}
        >
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="sparkles" size={14} color="#A78BFA" />
            <Text className="text-purple-400 text-[10px] font-bold uppercase tracking-[2px]">
              Featured
            </Text>
          </View>
          <Text className="text-white text-xl font-bold tracking-tight" numberOfLines={1}>
            {photo.alt_description || "Cyber Gallery"}
          </Text>
          <Text className="text-purple-300/70 text-xs mt-1 tracking-wide">
            by {photo.user.name}
          </Text>
        </View>
        <View
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(139, 92, 246, 0.25)" }}
        >
          <Text className="text-purple-300 text-[10px] font-bold tracking-widest">
            TRENDING
          </Text>
        </View>
      </View>
    </View>
  );
}
