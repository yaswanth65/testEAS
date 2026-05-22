import { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, Animated, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCuratedPhotos } from "../../hooks/useWallpapers";
import { useFavorites } from "../../hooks/useFavorites";
import MasonryGrid from "../../components/MasonryGrid";
import CategoryChips from "../../components/CategoryChips";
import HeroBanner from "../../components/HeroBanner";
import FloatingSearchBar from "../../components/FloatingSearchBar";
import StoriesRing from "../../components/StoriesRing";
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
      {/* Instagram-style top nav */}
      <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 0.5, borderBottomColor: "rgba(120,80,255,0.08)" }}>
        <View style={{ width: 40 }} />
        <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold", letterSpacing: -0.5 }}>CyberGram</Text>
        <TouchableOpacity onPress={() => router.push("/messages")}>
          <View style={{ position: "relative" }}>
            <Ionicons name="paper-plane-outline" size={24} color="#FFFFFF" />
            <View style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: 8, backgroundColor: "#EC4899", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#0A0A0F" }}>
              <Text style={{ color: "#FFF", fontSize: 8, fontWeight: "bold" }}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

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
        <StoriesRing />
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
