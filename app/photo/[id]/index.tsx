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
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ paddingTop: 64, paddingHorizontal: 16 }}><ShimmerPlaceholder width={40} height={40} borderRadius={20} /></View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ShimmerPlaceholder width={width - 32} height={height * 0.5} borderRadius={16} /></View>
      </View>
    );
  }

  if (!photo) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.2)" }}>
          <Text style={{ color: "#A78BFA", fontSize: 14, fontWeight: "bold" }}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ paddingTop: 64, paddingHorizontal: 20, paddingBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
          <Ionicons name="chevron-back" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity onPress={() => toggleFavorite(photo.id)} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: isFav ? "rgba(236, 72, 153, 0.2)" : "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color={isFav ? "#EC4899" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="share" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="download" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
            <Image source={{ uri: photo.urls.regular }} style={{ width: "100%", height: height * 0.45 }} contentFit="cover" transition={300} cachePolicy="memory-disk" placeholder={{ blurhash: photo.blur_hash }} />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>{photo.alt_description || "Cyber Wallpaper"}</Text>
          <Text style={{ color: "#8B8BA0", fontSize: 14, marginBottom: 16 }}>{photo.description || "AI Wallpaper Gallery"}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 24, padding: 16, borderRadius: 16, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
            <Image source={{ uri: photo.user.profile_image.medium }} style={{ width: 44, height: 44, borderRadius: 22 }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>{photo.user.name}</Text>
              <Text style={{ color: "#707088", fontSize: 12 }}>@{photo.user.username}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
            <View style={{ flex: 1, padding: 12, borderRadius: 12, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
              <Text style={{ color: "#C4B5FD", fontSize: 18, fontWeight: "bold" }}>{photo.likes}</Text>
              <Text style={{ color: "#707088", fontSize: 10, marginTop: 4, letterSpacing: 1 }}>LIKES</Text>
            </View>
            <View style={{ flex: 1, padding: 12, borderRadius: 12, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
              <Text style={{ color: "#C4B5FD", fontSize: 18, fontWeight: "bold" }}>{photo.width}x{photo.height}</Text>
              <Text style={{ color: "#707088", fontSize: 10, marginTop: 4, letterSpacing: 1 }}>RES</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
