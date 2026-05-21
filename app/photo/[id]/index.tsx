import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Share } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { usePhotoById } from "../../../hooks/useWallpapers";
import { useFavorites } from "../../../hooks/useFavorites";
import ShimmerPlaceholder from "../../../components/ShimmerPlaceholder";
import { COLORS } from "../../../constants/theme";

const { width, height } = Dimensions.get("window");

export default function CyberPhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: photo, isLoading } = usePhotoById(id);
  const { checkIsFavorite, toggleFavorite } = useFavorites();

  const handleShare = async () => {
    if (!photo) return;
    try { await Share.share({ message: `Check out this wallpaper by ${photo.user.name}!\n${photo.urls.regular}`, url: photo.urls.regular }); } catch {}
  };

  const isFav = id ? checkIsFavorite(id) : false;

  if (isLoading) {
    return (
      <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
        <View className="pt-16 px-4"><ShimmerPlaceholder width={40} height={40} borderRadius={20} /></View>
        <View className="flex-1 items-center justify-center">
          <ShimmerPlaceholder width={width - 32} height={height * 0.5} borderRadius={16} />
        </View>
      </View>
    );
  }

  if (!photo) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <Text className="text-lg font-bold" style={{ color: "white" }}>Not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 px-6 py-3 rounded-full" style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}>
          <Text className="text-sm font-bold" style={{ color: "#A78BFA" }}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <View className="pt-16 px-5 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: "rgba(20, 20, 40, 0.7)" }}
        >
          <Ionicons name="chevron-back" size={22} color="white" />
        </TouchableOpacity>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={() => toggleFavorite(photo.id)} className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: isFav ? "rgba(236, 72, 153, 0.2)" : "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color={isFav ? "#EC4899" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="share" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="download" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-4 mb-4">
          <View className="rounded-2xl overflow-hidden" style={{ borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
            <Image
              source={{ uri: photo.urls.regular }}
              style={{ width: "100%", height: height * 0.45 }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              placeholder={{ blurhash: photo.blur_hash }}
            />
          </View>
        </View>

        <View className="px-4">
          <Text className="text-xl font-bold tracking-tight mb-1" style={{ color: "white" }}>
            {photo.alt_description || "Cyber Wallpaper"}
          </Text>
          <Text className="text-sm mb-4 tracking-wide" style={{ color: "#8B8BA0" }}>
            {photo.description || "AI Wallpaper Gallery"}
          </Text>

          <View
            className="flex-row items-center gap-3 mb-6 p-4 rounded-2xl"
            style={{ backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
          >
            <Image
              source={{ uri: photo.user.profile_image.medium }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
              contentFit="cover"
            />
            <View className="flex-1">
              <Text className="text-sm font-bold tracking-wide" style={{ color: "white" }}>{photo.user.name}</Text>
              <Text className="text-xs" style={{ color: "#707088" }}>@{photo.user.username}</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            {[
              { value: photo.likes, label: "Likes" },
              { value: `${photo.width}×${photo.height}`, label: "Resolution" },
            ].map((item) => (
              <View
                key={item.label}
                className="flex-1 p-3 rounded-xl items-center"
                style={{ backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
              >
                <Text className="text-lg font-bold" style={{ color: "#C4B5FD" }}>{item.value}</Text>
                <Text className="text-[10px] mt-1 tracking-widest" style={{ color: "#707088" }}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
