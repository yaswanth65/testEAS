import unsplashApi from "./api";
import {
  getMockPhotos,
  getMockSearchPhotos,
  getMockRandomPhotos,
  getMockPhotoById,
} from "./mockData";
import type {
  UnsplashPhoto,
  UnsplashSearchResponse,
  UnsplashListResponse,
} from "../types";

const PER_PAGE = 30;
const ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY ?? "";
const USE_MOCK = !ACCESS_KEY;

export async function getCuratedPhotos(
  page: number = 1
): Promise<UnsplashListResponse> {
  if (USE_MOCK) return getMockPhotos(page);
  const response = await unsplashApi.get("/photos", {
    params: { page, per_page: PER_PAGE, order_by: "popular" },
  });
  return response.data;
}

export async function searchPhotos(
  query: string,
  page: number = 1
): Promise<UnsplashSearchResponse> {
  if (USE_MOCK) return getMockSearchPhotos(query, page);
  const response = await unsplashApi.get("/search/photos", {
    params: { query, page, per_page: PER_PAGE },
  });
  return response.data;
}

export async function getRandomPhotos(
  count: number = 30
): Promise<UnsplashListResponse> {
  if (USE_MOCK) return getMockRandomPhotos(count);
  const response = await unsplashApi.get("/photos/random", {
    params: { count },
  });
  return response.data;
}

export async function getPhotoById(id: string): Promise<UnsplashPhoto> {
  if (USE_MOCK) {
    const photo = getMockPhotoById(id);
    if (photo) return photo;
    throw new Error("Photo not found");
  }
  const response = await unsplashApi.get(`/photos/${id}`);
  return response.data;
}
