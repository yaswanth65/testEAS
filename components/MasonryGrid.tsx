import { useCallback, useMemo } from "react";
import { View, Dimensions } from "react-native";
import WallpaperCard from "./WallpaperCard";
import type { UnsplashPhoto } from "../types";

interface MasonryGridProps {
  photos: UnsplashPhoto[];
  onPhotoPress: (photo: UnsplashPhoto) => void;
  onLike: (photoId: string) => void;
  isFav?: (photoId: string) => boolean;
  numColumns?: number;
}

export default function MasonryGrid({
  photos,
  onPhotoPress,
  onLike,
  isFav,
  numColumns = 2,
}: MasonryGridProps) {
  const screenWidth = Dimensions.get("window").width;
  const columnWidth = (screenWidth - 48 - (numColumns - 1) * 12) / numColumns;

  const columns = useMemo(() => {
    const cols: UnsplashPhoto[][] = Array.from({ length: numColumns }, () => []);
    photos.forEach((photo, index) => {
      cols[index % numColumns].push(photo);
    });
    return cols;
  }, [photos, numColumns]);

  const renderCard = useCallback(
    (photo: UnsplashPhoto) => (
      <WallpaperCard
        key={photo.id}
        photo={photo}
        onPress={onPhotoPress}
        onLike={onLike}
        isFav={isFav?.(photo.id)}
      />
    ),
    [onPhotoPress, onLike, isFav]
  );

  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 12 }}>
      {columns.map((col, colIndex) => (
        <View key={colIndex} style={{ flex: 1, gap: 0 }}>
          {col.map((photo) => renderCard(photo))}
        </View>
      ))}
    </View>
  );
}
