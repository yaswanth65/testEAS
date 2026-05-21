import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../../hooks/useSearch";
import MasonryGrid from "../../components/MasonryGrid";
import { SearchSkeleton } from "../../components/SkeletonLoader";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "../../utils/storage";
import type { UnsplashPhoto } from "../../types";

export default function CyberSearchScreen() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearch(query);
  const photos = useMemo(() => data?.pages.flatMap((p) => p.results) ?? [], [data]);

  useEffect(() => { loadRecentSearches(); }, []);

  const loadRecentSearches = async () => {
    const searches = await getRecentSearches();
    setRecentSearches(searches);
  };

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      setShowResults(true);
      await addRecentSearch(searchQuery);
      setRecentSearches((prev) => [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 10));
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (query.trim()) await handleSearch(query.trim());
  }, [query, handleSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    setShowResults(false);
    inputRef.current?.focus();
  }, []);

  const handleClearRecent = useCallback(async () => {
    await clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {}, []);
  const handleLike = useCallback((photoId: string) => {}, []);

  return (
    <View className="flex-1" style={{ backgroundColor: "#0A0A0F" }}>
      <View className="px-4 pt-16 pb-2">
        <Text className="text-3xl font-bold tracking-tight" style={{ color: "white" }}>Explore</Text>
        <Text className="text-sm tracking-wide mt-0.5" style={{ color: "#8B8BA0" }}>
          Find your next wallpaper
        </Text>
      </View>

      <View
        className="mx-4 mb-4 px-5 py-3 rounded-2xl flex-row items-center"
        style={{
          backgroundColor: "rgba(20, 20, 40, 0.7)",
          borderWidth: 1,
          borderColor: query ? "rgba(139, 92, 246, 0.3)" : "rgba(120, 80, 255, 0.1)",
        }}
      >
        <Ionicons name="search" size={18} color="#7070A0" />
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          placeholder="Search..."
          placeholderTextColor="#555570"
          className="flex-1 text-base ml-3"
          style={{ color: "white" }}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close" size={18} color="#7070A0" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && query && <SearchSkeleton />}

      {!showResults && !isLoading && (
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {recentSearches.length > 0 && (
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={14} color="#7070A0" />
                  <Text className="text-sm font-bold tracking-wider" style={{ color: "#7070A0" }}>RECENT</Text>
                </View>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text className="text-xs font-bold" style={{ color: "#8B5CF6" }}>CLEAR</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <TouchableOpacity
                    key={search}
                    onPress={() => handleSearch(search)}
                    className="px-4 py-2 rounded-full"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}
                  >
                    <Text className="text-sm" style={{ color: "#C4B5FD" }}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View>
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="trending-up" size={14} color="#7070A0" />
              <Text className="text-sm font-bold tracking-wider" style={{ color: "#7070A0" }}>TRENDING</Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {["Neon", "Cyberpunk", "Synthwave", "Vaporwave", "Glitch", "Abstract"].map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => handleSearch(tag.toLowerCase())}
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: "rgba(30, 30, 50, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
                >
                  <Text className="text-sm" style={{ color: "#707088" }}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {showResults && query && !isLoading && (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }}
        >
          <MasonryGrid photos={photos} onPhotoPress={handlePhotoPress} onLike={handleLike} />
          {isFetchingNextPage && (
            <View className="py-4 items-center"><ActivityIndicator size="small" color="#A78BFA" /></View>
          )}
          {photos.length === 0 && query && (
            <View className="items-center justify-center py-12">
              <Ionicons name="search" size={40} color="#555570" />
              <Text className="text-base mt-3" style={{ color: "#555570" }}>No results found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
