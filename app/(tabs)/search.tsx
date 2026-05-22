import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../../hooks/useSearch";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "../../utils/storage";
import { SearchSkeleton } from "../../components/SkeletonLoader";
import { COLORS } from "../../constants/theme";
import type { UnsplashPhoto } from "../../types";

const { width } = Dimensions.get("window");
const EXPLORE_GRID = (width - 40) / 2;

const EXPLORE_CATEGORIES = [
  { title: "Neon Nights", color: "#8B5CF6", uri: "https://picsum.photos/seed/neon1/400/600" },
  { title: "Cyber City", color: "#3B82F6", uri: "https://picsum.photos/seed/cyber2/400/600" },
  { title: "Glitch Art", color: "#EC4899", uri: "https://picsum.photos/seed/glitch3/400/600" },
  { title: "Synthwave", color: "#F59E0B", uri: "https://picsum.photos/seed/synth4/400/600" },
  { title: "Vaporwave", color: "#06B6D4", uri: "https://picsum.photos/seed/vapor5/400/600" },
  { title: "Abstract", color: "#22C55E", uri: "https://picsum.photos/seed/abstract6/400/600" },
];

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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Search Bar */}
      <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8 }}>
        <View style={{ marginBottom: 12, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(30, 30, 50, 0.6)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.1)" }}>
          <Ionicons name="search" size={18} color="#7070A0" />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            placeholder="Search"
            placeholderTextColor="#555570"
            style={{ flex: 1, color: "#FFFFFF", fontSize: 16, marginLeft: 10 }}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color="#7070A0" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading && query && <SearchSkeleton />}

      {!showResults && !isLoading && (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Explore Grid - Instagram style */}
          <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>Explore</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {EXPLORE_CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.title} style={{ width: EXPLORE_GRID, height: EXPLORE_GRID * 1.2, borderRadius: 12, overflow: "hidden" }}>
                  <Image source={{ uri: cat.uri }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                  <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "bold" }}>{cat.title}</Text>
                  </View>
                  <View style={{ position: "absolute", top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: `${cat.color}40` }}>
                    <Text style={{ color: cat.color, fontSize: 9, fontWeight: "bold" }}>TRENDING</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>Recent</Text>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text style={{ color: "#8B5CF6", fontSize: 13, fontWeight: "600" }}>Clear All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {recentSearches.map((s) => (
                  <TouchableOpacity key={s} onPress={() => handleSearch(s)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.1)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.15)" }}>
                    <Text style={{ color: "#C4B5FD", fontSize: 13 }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}

      {showResults && query && !isLoading && (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} onScrollEndDrag={() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }}>
          <View style={{ paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
            {photos.map((photo: UnsplashPhoto) => (
              <TouchableOpacity key={photo.id} style={{ width: (width - 40) / 3, height: (width - 40) / 3 }}>
                <Image source={{ uri: photo.urls.small }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
              </TouchableOpacity>
            ))}
          </View>
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
