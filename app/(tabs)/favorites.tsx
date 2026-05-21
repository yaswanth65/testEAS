import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFavorites } from "../../utils/storage";
import { getPhotoById } from "../../services/unsplash";
import MasonryGrid from "../../components/MasonryGrid";
import { HomeSkeleton } from "../../components/SkeletonLoader";
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
    } catch { } finally { setLoading(false); }
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
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <View className="px-4 pt-16 pb-2">
        <Text className="text-3xl font-bold tracking-tight" style={{ color: "white" }}>Liked</Text>
        <Text className="text-sm tracking-wide mt-0.5" style={{ color: "#8B8BA0" }}>
          {favoritePhotos.length} saved wallpapers
        </Text>
      </View>

      {favoritePhotos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}
          >
            <Ionicons name="heart-outline" size={34} color="#8B5CF6" />
          </View>
          <Text className="text-lg font-bold tracking-tight mb-2" style={{ color: "white" }}>No likes yet</Text>
          <Text className="text-sm text-center tracking-wide" style={{ color: "#707088" }}>
            Tap the heart on any wallpaper to save it here
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <MasonryGrid photos={favoritePhotos} onPhotoPress={handlePhotoPress} onLike={handleLike} isFav={(id) => favoriteIds.includes(id)} />
        </ScrollView>
      )}
    </View>
  );
}
