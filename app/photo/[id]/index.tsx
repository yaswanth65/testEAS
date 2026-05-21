import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  User,
  Calendar,
  ChevronLeft,
} from "lucide-react-native";
import { usePhotoById } from "../../../hooks/useWallpapers";
import { useFavorites } from "../../../hooks/useFavorites";
import ShimmerPlaceholder from "../../../components/ShimmerPlaceholder";
import { COLORS } from "../../../constants/theme";

const { width, height } = Dimensions.get("window");

export default function PhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: photo, isLoading } = usePhotoById(id);
  const { checkIsFavorite, toggleFavorite } = useFavorites();

  const handleShare = async () => {
    if (!photo) return;
    try {
      await Share.share({
        message: `Check out this wallpaper by ${photo.user.name} on AI Wallpaper Gallery!\n${photo.urls.regular}`,
        url: photo.urls.regular,
      });
    } catch {}
  };

  const handleDownload = async () => {
    if (!photo) return;
    // TODO: Implement actual download with expo-file-system
  };

  const isFav = id ? checkIsFavorite(id) : false;

  if (isLoading) {
    return (
      <View className="flex-1 bg-dark-900">
        <View className="pt-16 px-4">
          <ShimmerPlaceholder width={40} height={40} borderRadius={20} />
        </View>
        <View className="flex-1 items-center justify-center">
          <ShimmerPlaceholder
            width={width - 32}
            height={height * 0.5}
            borderRadius={16}
          />
        </View>
      </View>
    );
  }

  if (!photo) {
    return (
      <View className="flex-1 bg-dark-900 items-center justify-center">
        <Text className="text-white text-lg">Photo not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 bg-accent-500 rounded-full"
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark-900">
      <View className="pt-16 px-4 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
        >
          <ChevronLeft size={22} color="white" />
        </TouchableOpacity>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => toggleFavorite(photo.id)}
            className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
          >
            <Heart
              size={20}
              color={isFav ? COLORS.error : "white"}
              fill={isFav ? COLORS.error : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
          >
            <Share2 size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload}
            className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
          >
            <Download size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-4 mb-4">
          <Image
            source={{ uri: photo.urls.regular }}
            style={{
              width: "100%",
              height: height * 0.45,
              borderRadius: 16,
            }}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            placeholder={{ blurhash: photo.blur_hash }}
          />
        </View>

        <View className="px-4">
          <Text className="text-white text-xl font-bold mb-1">
            {photo.alt_description || "Untitled Wallpaper"}
          </Text>
          <Text className="text-dark-100 text-sm mb-4">
            {photo.description || "AI Wallpaper Gallery"}
          </Text>

          <View className="flex-row items-center gap-3 mb-6 p-4 bg-dark-800 rounded-2xl border border-dark-600">
            <Image
              source={{ uri: photo.user.profile_image.medium }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
              contentFit="cover"
            />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">
                {photo.user.name}
              </Text>
              <Text className="text-dark-200 text-xs">
                @{photo.user.username}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 p-3 bg-dark-800 rounded-xl border border-dark-600 items-center">
              <Text className="text-white text-lg font-bold">
                {photo.likes}
              </Text>
              <Text className="text-dark-200 text-xs mt-1">Likes</Text>
            </View>
            <View className="flex-1 p-3 bg-dark-800 rounded-xl border border-dark-600 items-center">
              <Text className="text-white text-lg font-bold">
                {photo.width} × {photo.height}
              </Text>
              <Text className="text-dark-200 text-xs mt-1">Resolution</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
