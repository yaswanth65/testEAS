import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Share, TextInput } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { usePhotoById } from "../../../hooks/useWallpapers";
import { useFavorites } from "../../../hooks/useFavorites";
import ShimmerPlaceholder from "../../../components/ShimmerPlaceholder";
import HeartAnimation from "../../../components/HeartAnimation";
import { COLORS } from "../../../constants/theme";

const { width, height } = Dimensions.get("window");

const MOCK_COMMENTS = [
  { id: "1", user: "NeonArtist", avatar: "https://i.pravatar.cc/150?u=10", text: "This is absolutely stunning! 🔥", likes: 24, time: "2h" },
  { id: "2", user: "CyberPunk", avatar: "https://i.pravatar.cc/150?u=11", text: "Love the color palette on this one", likes: 12, time: "4h" },
  { id: "3", user: "GlitchQueen", avatar: "https://i.pravatar.cc/150?u=12", text: "Saved to my collection immediately", likes: 8, time: "6h" },
];

export default function CyberPhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: photo, isLoading } = usePhotoById(id);
  const { checkIsFavorite, toggleFavorite } = useFavorites();
  const [showHeart, setShowHeart] = useState(false);
  const [comment, setComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleShare = async () => {
    if (!photo) return;
    try {
      await Share.share({ message: `Check out this wallpaper by ${photo.user.name}!\n${photo.urls.regular}`, url: photo.urls.regular });
    } catch {}
  };

  const handleDoubleTap = () => {
    setShowHeart(true);
    if (id && !checkIsFavorite(id)) toggleFavorite(id);
  };

  const handleHeartComplete = () => setShowHeart(false);

  const toggleCommentLike = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  const isFav = id ? checkIsFavorite(id) : false;

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ paddingTop: 64, paddingHorizontal: 16 }}><ShimmerPlaceholder width={40} height={40} borderRadius={20} /></View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ShimmerPlaceholder width={width - 32} height={height * 0.5} borderRadius={16} /></View>
      </View>
    );
  }

  if (!photo) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, backgroundColor: "rgba(139, 92, 246, 0.2)" }}>
          <Text style={{ color: "#A78BFA", fontSize: 14, fontWeight: "bold" }}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Top Nav */}
        <View style={{ paddingTop: 64, paddingHorizontal: 20, paddingBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }} numberOfLines={1}>{photo.user.username}</Text>
          <TouchableOpacity onPress={handleShare} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 40, 0.7)" }}>
            <Ionicons name="paper-plane-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Photo with double-tap */}
        <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap} delayPressIn={0}>
          <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
            <View style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.15)" }}>
              <Image source={{ uri: photo.urls.regular }} style={{ width: "100%", height: height * 0.45 }} contentFit="cover" transition={300} cachePolicy="memory-disk" placeholder={{ blurhash: photo.blur_hash }} />
              <HeartAnimation visible={showHeart} onComplete={handleHeartComplete} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Action Bar */}
        <View style={{ paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <TouchableOpacity onPress={() => toggleFavorite(photo.id)}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "#EC4899" : "#FFFFFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="paper-plane-outline" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Likes */}
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>{photo.likes.toLocaleString()} likes</Text>
        </View>

        {/* Caption */}
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
            <Text style={{ fontWeight: "bold" }}>{photo.user.username} </Text>
            {photo.alt_description || "Cyberpunk AI generated wallpaper"}
          </Text>
        </View>

        {/* View all comments */}
        <TouchableOpacity style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ color: "#555570", fontSize: 13 }}>View all {MOCK_COMMENTS.length} comments</Text>
        </TouchableOpacity>

        {/* Comments */}
        {MOCK_COMMENTS.map((c) => (
          <View key={c.id} style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
            <Image source={{ uri: c.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                <Text style={{ fontWeight: "bold" }}>{c.user} </Text>
                {c.text}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 4 }}>
                <Text style={{ color: "#555570", fontSize: 11 }}>{c.time}</Text>
                <Text style={{ color: "#555570", fontSize: 11, fontWeight: "bold" }}>Reply</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleCommentLike(c.id)} style={{ padding: 4 }}>
              <Ionicons name={likedComments.has(c.id) ? "heart" : "heart-outline"} size={14} color={likedComments.has(c.id) ? "#EC4899" : "#555570"} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add comment */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 10, borderTopWidth: 0.5, borderTopColor: "rgba(120,80,255,0.08)", marginTop: 8 }}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=cyber" }} style={{ width: 32, height: 32, borderRadius: 16 }} contentFit="cover" />
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor="#555570"
            style={{ flex: 1, color: "#FFFFFF", fontSize: 14 }}
          />
          {comment.length > 0 && (
            <TouchableOpacity>
              <Text style={{ color: "#3B82F6", fontSize: 14, fontWeight: "bold" }}>Post</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Grid */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1, padding: 14, borderRadius: 14, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{photo.likes}</Text>
              <Text style={{ color: "#555570", fontSize: 10, marginTop: 2, letterSpacing: 1 }}>LIKES</Text>
            </View>
            <View style={{ flex: 1, padding: 14, borderRadius: 14, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
              <Ionicons name="eye" size={20} color="#3B82F6" />
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{(photo.likes * 12).toLocaleString()}</Text>
              <Text style={{ color: "#555570", fontSize: 10, marginTop: 2, letterSpacing: 1 }}>VIEWS</Text>
            </View>
            <View style={{ flex: 1, padding: 14, borderRadius: 14, alignItems: "center", backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
              <Ionicons name="download" size={20} color="#06B6D4" />
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{Math.floor(photo.likes / 3)}</Text>
              <Text style={{ color: "#555570", fontSize: 10, marginTop: 2, letterSpacing: 1 }}>DOWNLOADS</Text>
            </View>
          </View>
        </View>

        {/* Author Card */}
        <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderRadius: 16, backgroundColor: "rgba(20, 20, 40, 0.5)", borderWidth: 1, borderColor: "rgba(120, 80, 255, 0.08)" }}>
            <Image source={{ uri: photo.user.profile_image.medium }} style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "rgba(139, 92, 246, 0.3)" }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "bold" }}>{photo.user.name}</Text>
              <Text style={{ color: "#707088", fontSize: 12 }}>@{photo.user.username}</Text>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: "rgba(139, 92, 246, 0.2)", borderWidth: 1, borderColor: "rgba(139, 92, 246, 0.3)" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
