import { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useCuratedPhotos } from "../../hooks/useWallpapers";
import { useFavorites } from "../../hooks/useFavorites";
import MasonryGrid from "../../components/MasonryGrid";
import CategoryChips from "../../components/CategoryChips";
import HeroBanner from "../../components/HeroBanner";
import FloatingSearchBar from "../../components/FloatingSearchBar";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import type { UnsplashPhoto } from "../../types";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useCuratedPhotos();

  const { checkIsFavorite, toggleFavorite } = useFavorites();

  const photos = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);

  const heroPhoto = useMemo(
    () => (photos.length > 0 ? photos[Math.floor(Math.random() * Math.min(5, photos.length))] : null),
    [photos]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handlePhotoPress = useCallback(
    (photo: UnsplashPhoto) => {
      router.push({
        pathname: "/photo/[id]",
        params: { id: photo.id },
      });
    },
    [router]
  );

  const handleLike = useCallback(
    (photoId: string) => {
      toggleFavorite(photoId);
    },
    [toggleFavorite]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-dark-900"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#38BDF8"
          colors={["#38BDF8"]}
        />
      }
      onScrollEndDrag={handleLoadMore}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View className="px-4 pt-16 pb-2">
        <Text className="text-white text-3xl font-bold">Wallpapers</Text>
        <Text className="text-dark-100 text-base mt-1">
          Discover amazing AI-generated art
        </Text>
      </View>
      <FloatingSearchBar onPress={() => router.push("/(tabs)/search")} />
      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
      <HeroBanner photo={heroPhoto} />

      <View className="mt-2">
        <MasonryGrid
          photos={photos}
          onPhotoPress={handlePhotoPress}
          onLike={handleLike}
          isFav={checkIsFavorite}
        />
      </View>

      {isFetchingNextPage && (
        <View className="py-4 items-center">
          <ActivityIndicator size="small" color="#38BDF8" />
        </View>
      )}
    </ScrollView>
  );
}
