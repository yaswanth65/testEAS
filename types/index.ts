export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface UnsplashPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  alt_description: string | null;
  user: UnsplashUser;
  urls: UnsplashPhotoUrls;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface UnsplashListResponse extends Array<UnsplashPhoto> {}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface FavoriteItem {
  id: string;
  photo: UnsplashPhoto;
  savedAt: number;
}
