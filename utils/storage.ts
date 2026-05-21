import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites";
const RECENT_SEARCHES_KEY = "@recent_searches";
const MAX_RECENT_SEARCHES = 10;

export async function getFavorites(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(photoId: string): Promise<void> {
  const favorites = await getFavorites();
  if (!favorites.includes(photoId)) {
    favorites.unshift(photoId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export async function removeFavorite(photoId: string): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((id) => id !== photoId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function isFavorite(photoId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(photoId);
}

export async function getRecentSearches(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addRecentSearch(query: string): Promise<void> {
  const searches = await getRecentSearches();
  const filtered = searches.filter((s) => s !== query);
  filtered.unshift(query);
  const trimmed = filtered.slice(0, MAX_RECENT_SEARCHES);
  await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(trimmed));
}

export async function clearRecentSearches(): Promise<void> {
  await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
}
