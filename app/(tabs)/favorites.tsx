import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { getFavorites } from "../../utils/storage";
import { getPhotoById } from "../../services/unsplash";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import { COLORS } from "../../constants/theme";
import type { UnsplashPhoto } from "../../types";

export default function CyberFavoritesScreen() {
  const [favoritePhotos, setFavoritePhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "liked" | "saved">("all");

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getFavorites();
      if (ids.length === 0) { setFavoritePhotos([]); setLoading(false); return; }
      const photos = await Promise.all(ids.map((id) => getPhotoById(id).catch(() => null)));
      setFavoritePhotos(photos.filter((p): p is UnsplashPhoto => p !== null));
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const handleRemove = useCallback(async (photoId: string) => {
    const { removeFavorite } = await import("../../utils/storage");
    await removeFavorite(photoId);
    setFavoritePhotos((prev) => prev.filter((p) => p.id !== photoId));
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TouchableOpacity>
          <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Saved</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={{ flexDirection: "row", paddingHorizontal: 16, paddingVertical: 8, gap: 12 }}>
        {(["all", "liked", "saved"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: activeFilter === f ? "rgba(139, 92, 246, 0.2)" : "transparent",
              borderWidth: activeFilter === f ? 1 : 0,
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <Text style={{ color: activeFilter === f ? "#FFFFFF" : "#8B8BA0", fontSize: 13, fontWeight: "600" }}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {favoritePhotos.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 16, backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}>
            <Ionicons name="bookmark-outline" size={34} color="#8B5CF6" />
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Save your favorites</Text>
          <Text style={{ color: "#707088", fontSize: 14, textAlign: "center" }}>Tap the bookmark to save wallpapers you love</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={{ paddingHorizontal: 16 }}>
            {favoritePhotos.map((photo) => (
              <View key={photo.id} style={{ marginBottom: 16, borderRadius: 16, overflow: "hidden", backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.12)" }}>
                <Image source={{ uri: photo.urls.regular }} style={{ width: "100%", height: 280 }} contentFit="cover" />
                <View style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Image source={{ uri: photo.user.profile_image.small }} style={{ width: 32, height: 32, borderRadius: 16 }} contentFit="cover" />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }} numberOfLines={1}>{photo.user.name}</Text>
                    <Text style={{ color: "#8B8BA0", fontSize: 11 }}>{photo.likes.toLocaleString()} likes</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemove(photo.id)} style={{ padding: 6 }}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
