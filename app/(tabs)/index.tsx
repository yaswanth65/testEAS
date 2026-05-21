import { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCuratedPhotos } from "../../hooks/useWallpapers";
import { useFavorites } from "../../hooks/useFavorites";
import MasonryGrid from "../../components/MasonryGrid";
import CategoryChips from "../../components/CategoryChips";
import HeroBanner from "../../components/HeroBanner";
import FloatingSearchBar from "../../components/FloatingSearchBar";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import type { UnsplashPhoto } from "../../types";

export default function CyberHomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useCuratedPhotos();
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

  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {
    router.push({ pathname: "/photo/[id]", params: { id: photo.id } });
  }, [router]);

  const handleLike = useCallback((photoId: string) => {
    toggleFavorite(photoId);
  }, [toggleFavorite]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  if (isLoading) return <HomeSkeleton />;

  return (
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#A78BFA"
            colors={["#A78BFA"]}
            progressBackgroundColor="#1A1A2E"
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={handleLoadMore}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Animated.View style={{ opacity: headerOpacity }}>
          <View className="px-4 pt-16 pb-1">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-3xl font-bold tracking-tight" style={{ color: "white" }}>Gallery</Text>
                <Text className="text-sm tracking-wide mt-0.5" style={{ color: "#8B8BA0" }}>
                  Discover cyber art
                </Text>
              </View>
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(139, 92, 246, 0.15)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.2)" }}
              >
                <Ionicons name="sparkles" size={18} color="#A78BFA" />
              </View>
            </View>
          </View>
        </Animated.View>

        <FloatingSearchBar onPress={() => router.push("/(tabs)/search")} />
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
        <HeroBanner photo={heroPhoto} />

        <View className="px-4 mb-3 flex-row items-center justify-between">
          <Text className="text-sm font-bold tracking-widest" style={{ color: "#C4B5FD" }}>EXPLORE</Text>
          <View className="flex-row items-center gap-1">
            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#8B5CF6" }} />
            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(139, 92, 246, 0.4)" }} />
            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }} />
          </View>
        </View>

        <MasonryGrid
          photos={photos}
          onPhotoPress={handlePhotoPress}
          onLike={handleLike}
          isFav={checkIsFavorite}
        />

        {isFetchingNextPage && (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color="#A78BFA" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
