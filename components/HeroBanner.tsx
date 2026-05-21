import { Dimensions, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { UnsplashPhoto } from "../types";

const { width } = Dimensions.get("window");

interface HeroBannerProps { photo: UnsplashPhoto | null }

export default function HeroBanner({ photo }: HeroBannerProps) {
  if (!photo) return null;
  return (
    <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
      <View style={{ height: 220, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
        <Image source={{ uri: photo.urls.regular }} style={{ width: "100%", height: 220 }} contentFit="cover" transition={500} cachePolicy="memory-disk" placeholder={{ blurhash: photo.blur_hash }} />
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10, 10, 15, 0.3)" }} />
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "rgba(10, 10, 15, 0.6)" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Ionicons name="sparkles" size={14} color="#A78BFA" />
            <Text style={{ color: "#A78BFA", fontSize: 10, fontWeight: "bold", letterSpacing: 2 }}>FEATURED</Text>
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }} numberOfLines={1}>{photo.alt_description || "Cyber Gallery"}</Text>
          <Text style={{ color: "rgba(196, 181, 253, 0.7)", fontSize: 12, marginTop: 2 }}>by {photo.user.name}</Text>
        </View>
        <View style={{ position: "absolute", top: 12, right: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.25)" }}>
          <Text style={{ color: "#C4B5FD", fontSize: 10, fontWeight: "bold", letterSpacing: 2 }}>TRENDING</Text>
        </View>
      </View>
    </View>
  );
}
