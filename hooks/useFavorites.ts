import { useState, useEffect, useCallback } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../utils/storage";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const ids = await getFavorites();
    setFavoriteIds(ids);
    setLoading(false);
  };

  const toggleFavorite = useCallback(async (photoId: string) => {
    const currentlyFav = await isFavorite(photoId);
    if (currentlyFav) {
      await removeFavorite(photoId);
      setFavoriteIds((prev) => prev.filter((id) => id !== photoId));
    } else {
      await addFavorite(photoId);
      setFavoriteIds((prev) => [photoId, ...prev]);
    }
  }, []);

  const checkIsFavorite = useCallback(
    (photoId: string) => favoriteIds.includes(photoId),
    [favoriteIds]
  );

  return {
    favoriteIds,
    loading,
    toggleFavorite,
    checkIsFavorite,
    refresh: loadFavorites,
  };
}
