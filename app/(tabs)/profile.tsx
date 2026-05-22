import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, Dimensions, Alert } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import { getFavorites } from "../../utils/storage";
import { getPhotoById } from "../../services/unsplash";
import { HomeSkeleton } from "../../components/SkeletonLoader";
import { COLORS } from "../../constants/theme";
import type { UnsplashPhoto } from "../../types";

const { width } = Dimensions.get("window");
const GRID_SIZE = (width - 48) / 3;

export default function CyberProfileScreen() {
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";
  const [favoritePhotos, setFavoritePhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"grid" | "saved" | "tagged">("grid");
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const handleCheckUpdate = useCallback(async () => {
    if (__DEV__) {
      Alert.alert("Updates", "Not available in development mode");
      return;
    }
    setCheckingUpdate(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert("Update Available", "App will restart to apply the update.", [
          { text: "Restart Now", onPress: () => Updates.reloadAsync() },
          { text: "Later", style: "cancel" },
        ]);
      } else {
        Alert.alert("Up to Date", "You are on the latest version.");
      }
    } catch (e) {
      Alert.alert("Error", "Could not check for updates.");
    } finally {
      setCheckingUpdate(false);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getFavorites();
      if (ids.length === 0) { setFavoritePhotos([]); setLoading(false); return; }
      const photos = await Promise.all(ids.slice(0, 9).map((id) => getPhotoById(id).catch(() => null)));
      setFavoritePhotos(photos.filter((p): p is UnsplashPhoto => p !== null));
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const stats = [
    { label: "Posts", value: "142" },
    { label: "Followers", value: "12.4K" },
    { label: "Following", value: "384" },
  ];

  const highlights = [
    { icon: "image", label: "Wallpapers", color: "#8B5CF6" },
    { icon: "heart", label: "Liked", color: "#EC4899" },
    { icon: "download", label: "Saved", color: "#06B6D4" },
    { icon: "sparkles", label: "AI Art", color: "#F59E0B" },
  ];

  if (loading) return <HomeSkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>cyber_gallery</Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Row */}
        <View style={{ paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 20 }}>
          {/* Avatar with ring */}
          <View style={{ width: 86, height: 86, borderRadius: 43, padding: 2.5, backgroundColor: "transparent" }}>
            <View style={{ width: "100%", height: "100%", borderRadius: 41, borderWidth: 2, borderColor: "#EC4899", borderStyle: "dashed" as any, alignItems: "center", justifyContent: "center" }}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=cyber" }}
                style={{ width: 76, height: 76, borderRadius: 38 }}
                contentFit="cover"
              />
            </View>
          </View>
          {/* Stats */}
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
            {stats.map((s) => (
              <View key={s.label} style={{ alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>{s.value}</Text>
                <Text style={{ color: "#8B8BA0", fontSize: 12, marginTop: 2 }}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bio */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>Cyber Gallery</Text>
          <Text style={{ color: "#A78BFA", fontSize: 13, marginTop: 2 }}>AI Wallpaper Artist</Text>
          <Text style={{ color: "#8B8BA0", fontSize: 13, marginTop: 4, lineHeight: 18 }}>
            Creating stunning cyberpunk & neon wallpapers with AI{"\n"}
            Daily drops | Commission open{"\n"}
            Link below
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/yaswanth65/testEAS")}>
            <Text style={{ color: "#3B82F6", fontSize: 13, marginTop: 4 }}>github.com/yaswanth65/testEAS</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center", backgroundColor: "rgba(139, 92, 246, 0.2)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.3)" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.7)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
            <Ionicons name="person-add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Story Highlights */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}>
          {highlights.map((h) => (
            <TouchableOpacity key={h.label} style={{ alignItems: "center", gap: 6 }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: `${h.color}40`, alignItems: "center", justifyContent: "center", backgroundColor: `${h.color}15` }}>
                <Ionicons name={h.icon as any} size={24} color={h.color} />
              </View>
              <Text style={{ color: "#FFFFFF", fontSize: 11 }}>{h.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Switcher */}
        <View style={{ flexDirection: "row", borderTopWidth: 0.5, borderTopColor: "rgba(120,80,255,0.08)" }}>
          {[
            { key: "grid" as const, icon: "grid" },
            { key: "saved" as const, icon: "bookmark" },
            { key: "tagged" as const, icon: "person" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{ flex: 1, alignItems: "center", paddingVertical: 10, borderBottomWidth: activeTab === tab.key ? 1.5 : 0, borderBottomColor: "#FFFFFF" }}
            >
              <Ionicons name={tab.icon as any} size={22} color={activeTab === tab.key ? "#FFFFFF" : "#555570"} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Photo Grid */}
        <View style={{ paddingHorizontal: 16, paddingTop: 2 }}>
          {favoritePhotos.length === 0 ? (
            <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 48 }}>
              <Ionicons name="camera-outline" size={48} color="#555570" />
              <Text style={{ color: "#555570", fontSize: 16, marginTop: 12, fontWeight: "600" }}>No Posts Yet</Text>
              <Text style={{ color: "#555570", fontSize: 13, marginTop: 4 }}>When you share photos, they'll appear here</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
              {favoritePhotos.map((photo) => (
                <View key={photo.id} style={{ width: GRID_SIZE, height: GRID_SIZE }}>
                  <Image source={{ uri: photo.urls.small }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* OTA Status */}
        <View style={{ marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
          <Text style={{ color: "#7070A0", fontSize: 11, fontWeight: "bold", letterSpacing: 2, marginBottom: 8 }}>OTA STATUS</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22C55E" }} />
            <Text style={{ color: "#C4B5FD", fontSize: 13 }}>Up to date (production)</Text>
          </View>
          <Text style={{ color: "#555570", fontSize: 10, marginTop: 4 }}>Runtime: {Constants.expoConfig?.runtimeVersion ?? "1.0.0"}</Text>
          <TouchableOpacity
            onPress={handleCheckUpdate}
            disabled={checkingUpdate}
            style={{ marginTop: 12, paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: "rgba(139, 92, 246, 0.15)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.25)" }}
          >
            <Text style={{ color: "#A78BFA", fontSize: 13, fontWeight: "bold" }}>
              {checkingUpdate ? "Checking..." : "Check for Updates"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* GitHub Link */}
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/yaswanth65/testEAS")}
          style={{ marginHorizontal: 16, marginTop: 12, padding: 16, borderRadius: 16, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}
        >
          <Ionicons name="logo-github" size={20} color="#C4B5FD" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>GitHub</Text>
            <Text style={{ color: "#707088", fontSize: 12, marginTop: 2 }}>yaswanth65/testEAS</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#555570" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
