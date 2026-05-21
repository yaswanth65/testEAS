import unsplashApi from "./api";
import type {
  UnsplashPhoto,
  UnsplashSearchResponse,
  UnsplashListResponse,
} from "../types";

const PER_PAGE = 30;

export async function getCuratedPhotos(
  page: number = 1
): Promise<UnsplashListResponse> {
  const response = await unsplashApi.get("/photos", {
    params: { page, per_page: PER_PAGE, order_by: "popular" },
  });
  return response.data;
}

export async function searchPhotos(
  query: string,
  page: number = 1
): Promise<UnsplashSearchResponse> {
  const response = await unsplashApi.get("/search/photos", {
    params: { query, page, per_page: PER_PAGE },
  });
  return response.data;
}

export async function getRandomPhotos(
  count: number = 30
): Promise<UnsplashListResponse> {
  const response = await unsplashApi.get("/photos/random", {
    params: { count },
  });
  return response.data;
}

export async function getPhotoById(id: string): Promise<UnsplashPhoto> {
  const response = await unsplashApi.get(`/photos/${id}`);
  return response.data;
}
