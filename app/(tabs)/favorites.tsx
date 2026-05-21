import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFavorites } from "../../utils/storage";
import { getPhotoById } from "../../services/unsplash";
import MasonryGrid from "../../components/MasonryGrid";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import { COLORS } from "../../constants/theme";
import type { UnsplashPhoto } from "../../types";

export default function CyberFavoritesScreen() {
  const [favoritePhotos, setFavoritePhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getFavorites();
      setFavoriteIds(ids);
      if (ids.length === 0) { setFavoritePhotos([]); setLoading(false); return; }
      const photos = await Promise.all(ids.map((id) => getPhotoById(id).catch(() => null)));
      setFavoritePhotos(photos.filter((p): p is UnsplashPhoto => p !== null));
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {}, []);
  const handleLike = useCallback(async (photoId: string) => {
    const { removeFavorite } = await import("../../utils/storage");
    await removeFavorite(photoId);
    setFavoritePhotos((prev) => prev.filter((p) => p.id !== photoId));
    setFavoriteIds((prev) => prev.filter((id) => id !== photoId));
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 64, paddingBottom: 8 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "bold", letterSpacing: -0.5 }}>Liked</Text>
        <Text style={{ color: "#8B8BA0", fontSize: 14, marginTop: 2 }}>{favoritePhotos.length} saved wallpapers</Text>
      </View>

      {favoritePhotos.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 16, backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}>
            <Ionicons name="heart-outline" size={34} color="#8B5CF6" />
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>No likes yet</Text>
          <Text style={{ color: "#707088", fontSize: 14, textAlign: "center" }}>Tap the heart on any wallpaper to save it here</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <MasonryGrid photos={favoritePhotos} onPhotoPress={handlePhotoPress} onLike={handleLike} isFav={(id) => favoriteIds.includes(id)} />
        </ScrollView>
      )}
    </View>
  );
}
