import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../../hooks/useSearch";
import MasonryGrid from "../../components/MasonryGrid";
import { SearchSkeleton } from "../../components/SkeletonLoader";
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from "../../utils/storage";
import type { UnsplashPhoto } from "../../types";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearch(query);

  const photos = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data]
  );

  useEffect(() => {
    loadRecentSearches();
  }, []);

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
    if (query.trim()) {
      await handleSearch(query.trim());
    }
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

  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {
    // TODO: Navigate to photo detail
  }, []);

  const handleLike = useCallback((photoId: string) => {
    // TODO: Implement favorites
  }, []);

  return (
    <View className="flex-1 bg-dark-900">
      <View className="px-4 pt-16 pb-2">
        <Text className="text-white text-3xl font-bold">Search</Text>
        <Text className="text-dark-100 text-base mt-1">
          Find your perfect wallpaper
        </Text>
      </View>

      <View className="mx-4 mb-4 px-4 py-3 bg-dark-700 rounded-2xl flex-row items-center border border-dark-500">
        <Ionicons name="search" size={18} color="#707070" />
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          placeholder="Search wallpapers..."
          placeholderTextColor="#545454"
          className="flex-1 text-white text-base ml-3"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close" size={18} color="#707070" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && query && <SearchSkeleton />}

      {!showResults && !isLoading && (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {recentSearches.length > 0 && (
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="#707070" />
                  <Text className="text-dark-100 text-sm font-semibold">
                    Recent Searches
                  </Text>
                </View>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text className="text-accent-400 text-xs">Clear</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <TouchableOpacity
                    key={search}
                    onPress={() => handleSearch(search)}
                    className="px-3 py-2 bg-dark-600 rounded-full"
                  >
                    <Text className="text-dark-100 text-sm">{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View className="mt-8">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="trending-up" size={16} color="#707070" />
              <Text className="text-dark-100 text-sm font-semibold">
                Trending Searches
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {["Nature", "City", "Abstract", "Space", "Technology", "Architecture"].map(
                (tag) => (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => handleSearch(tag.toLowerCase())}
                    className="px-3 py-2 bg-dark-600 rounded-full"
                  >
                    <Text className="text-dark-100 text-sm">{tag}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </ScrollView>
      )}

      {showResults && query && !isLoading && (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
        >
          <MasonryGrid
            photos={photos}
            onPhotoPress={handlePhotoPress}
            onLike={handleLike}
          />
          {isFetchingNextPage && (
            <View className="py-4 items-center">
              <ActivityIndicator size="small" color="#38BDF8" />
            </View>
          )}
          {photos.length === 0 && query && (
            <View className="items-center justify-center py-12">
              <Text className="text-dark-200 text-base">No results found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
