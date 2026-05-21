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
import { COLORS } from "../../constants/theme";
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

  if (isLoading) return <HomeSkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1 }}
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
        scrollEventThrottle={16}
        onScrollEndDrag={handleLoadMore}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={{ paddingHorizontal: 16, paddingTop: 64, paddingBottom: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "bold", letterSpacing: -0.5 }}>Gallery</Text>
              <Text style={{ color: "#8B8BA0", fontSize: 14, marginTop: 2 }}>Discover cyber art</Text>
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(139, 92, 246, 0.15)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.2)", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="sparkles" size={18} color="#A78BFA" />
            </View>
          </View>
        </View>

        <FloatingSearchBar onPress={() => router.push("/(tabs)/search")} />
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
        <HeroBanner photo={heroPhoto} />

        <View style={{ paddingHorizontal: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ color: "#C4B5FD", fontSize: 13, fontWeight: "bold", letterSpacing: 3 }}>EXPLORE</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#8B5CF6" }} />
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(139, 92, 246, 0.4)" }} />
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(139, 92, 246, 0.2)" }} />
          </View>
        </View>

        <MasonryGrid photos={photos} onPhotoPress={handlePhotoPress} onLike={handleLike} isFav={checkIsFavorite} />

        {isFetchingNextPage && <View style={{ paddingVertical: 16, alignItems: "center" }}><ActivityIndicator size="small" color="#A78BFA" /></View>}
      </ScrollView>
    </View>
  );
}
