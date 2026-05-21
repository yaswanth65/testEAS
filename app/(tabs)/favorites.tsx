import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { getFavorites } from "../../utils/storage";
import { getPhotoById } from "../../services/unsplash";
import MasonryGrid from "../../components/MasonryGrid";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import type { UnsplashPhoto } from "../../types";

export default function FavoritesScreen() {
  const [favoritePhotos, setFavoritePhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getFavorites();
      setFavoriteIds(ids);
      if (ids.length === 0) {
        setFavoritePhotos([]);
        setLoading(false);
        return;
      }
      const photos = await Promise.all(
        ids.map((id) => getPhotoById(id).catch(() => null))
      );
      setFavoritePhotos(photos.filter((p): p is UnsplashPhoto => p !== null));
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {}, []);

  const handleLike = useCallback(
    async (photoId: string) => {
      const { removeFavorite } = await import("../../utils/storage");
      await removeFavorite(photoId);
      setFavoritePhotos((prev) => prev.filter((p) => p.id !== photoId));
      setFavoriteIds((prev) => prev.filter((id) => id !== photoId));
    },
    []
  );

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <View className="flex-1 bg-dark-900">
      <View className="px-4 pt-16 pb-2">
        <Text className="text-white text-3xl font-bold">Favorites</Text>
        <Text className="text-dark-100 text-base mt-1">
          {favoritePhotos.length} saved wallpapers
        </Text>
      </View>

      {favoritePhotos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full bg-dark-600 items-center justify-center mb-4">
            <Ionicons name="heart-outline" size={32} color="#707070" />
          </View>
          <Text className="text-white text-lg font-semibold mb-2">
            No favorites yet
          </Text>
          <Text className="text-dark-200 text-center text-sm">
            Tap the heart icon on any wallpaper to save it here
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <MasonryGrid
            photos={favoritePhotos}
            onPhotoPress={handlePhotoPress}
            onLike={handleLike}
            isFav={(id) => favoriteIds.includes(id)}
          />
        </ScrollView>
      )}
    </View>
  );
}
