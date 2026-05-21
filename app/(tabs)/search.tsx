import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../../hooks/useSearch";
import MasonryGrid from "../../components/MasonryGrid";
import { SearchSkeleton } from "../../components/SkeletonLoader";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "../../utils/storage";
import { COLORS } from "../../constants/theme";
import type { UnsplashPhoto } from "../../types";

export default function CyberSearchScreen() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearch(query);
  const photos = useMemo(() => data?.pages.flatMap((p) => p.results) ?? [], [data]);

  useEffect(() => { loadRecentSearches(); }, []);

  const loadRecentSearches = async () => setRecentSearches(await getRecentSearches());

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      setShowResults(true);
      await addRecentSearch(searchQuery);
      setRecentSearches((prev) => [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 10));
    }
  }, []);

  const handleSubmit = useCallback(async () => { if (query.trim()) await handleSearch(query.trim()); }, [query, handleSearch]);
  const handleClear = useCallback(() => { setQuery(""); setShowResults(false); inputRef.current?.focus(); }, []);
  const handleClearRecent = useCallback(async () => { await clearRecentSearches(); setRecentSearches([]); }, []);
  const handlePhotoPress = useCallback((photo: UnsplashPhoto) => {}, []);
  const handleLike = useCallback((photoId: string) => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 64, paddingBottom: 8 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "bold", letterSpacing: -0.5 }}>Explore</Text>
        <Text style={{ color: "#8B8BA0", fontSize: 14, marginTop: 2 }}>Find your next wallpaper</Text>
      </View>

      <View style={{ marginHorizontal: 16, marginBottom: 16, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: query ? "rgba(139, 92, 246, 0.3)" : "rgba(120, 80, 255, 0.1)" }}>
        <Ionicons name="search" size={18} color="#7070A0" />
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          placeholder="Search..."
          placeholderTextColor="#555570"
          style={{ flex: 1, color: "#FFFFFF", fontSize: 16, marginLeft: 12 }}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && <TouchableOpacity onPress={handleClear}><Ionicons name="close" size={18} color="#7070A0" /></TouchableOpacity>}
      </View>

      {isLoading && query && <SearchSkeleton />}

      {!showResults && !isLoading && (
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
          {recentSearches.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Ionicons name="time-outline" size={14} color="#7070A0" />
                  <Text style={{ color: "#7070A0", fontSize: 13, fontWeight: "bold", letterSpacing: 2 }}>RECENT</Text>
                </View>
                <TouchableOpacity onPress={handleClearRecent}><Text style={{ color: "#8B5CF6", fontSize: 12, fontWeight: "bold" }}>CLEAR</Text></TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {recentSearches.map((s) => (
                  <TouchableOpacity key={s} onPress={() => handleSearch(s)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}>
                    <Text style={{ color: "#C4B5FD", fontSize: 14 }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Ionicons name="trending-up" size={14} color="#7070A0" />
              <Text style={{ color: "#7070A0", fontSize: 13, fontWeight: "bold", letterSpacing: 2 }}>TRENDING</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["Neon", "Cyberpunk", "Synthwave", "Vaporwave", "Glitch", "Abstract"].map((t) => (
                <TouchableOpacity key={t} onPress={() => handleSearch(t.toLowerCase())} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: "rgba(30, 30, 50, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
                  <Text style={{ color: "#707088", fontSize: 14 }}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {showResults && query && !isLoading && (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} onScrollEndDrag={() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }}>
          <MasonryGrid photos={photos} onPhotoPress={handlePhotoPress} onLike={handleLike} />
          {isFetchingNextPage && <View style={{ paddingVertical: 16, alignItems: "center" }}><ActivityIndicator size="small" color="#A78BFA" /></View>}
          {photos.length === 0 && query && (
            <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 48 }}>
              <Ionicons name="search" size={40} color="#555570" />
              <Text style={{ color: "#555570", fontSize: 16, marginTop: 12 }}>No results found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
