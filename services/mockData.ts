import type { UnsplashPhoto, UnsplashSearchResponse, UnsplashListResponse } from "../types";

const COLORS = [
  "#0EA5E9", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981",
  "#EF4444", "#6366F1", "#14B8A6", "#F97316", "#84CC16",
];

const TITLES = [
  "Cosmic Nebula", "Neon City Nights", "Digital Dreams", "Abstract Harmony",
  "Mountain Serenity", "Ocean Depths", "Urban Geometry", "Minimal Waves",
  "Golden Hour", "Midnight Aurora", "Crystal Palace", "Eternal Sunset",
  "Quantum Fields", "Cyberpunk Streets", "Liquid Metal",
];

const AUTHORS = [
  { name: "Alex Chen", username: "alexchen" },
  { name: "Sarah Williams", username: "sarahw" },
  { name: "Marcus Rivera", username: "mrivera" },
  { name: "Yuki Tanaka", username: "ytanaka" },
  { name: "Emma Thompson", username: "emmath" },
  { name: "Raj Patel", username: "rajp" },
  { name: "Lena Schmidt", username: "lenasch" },
  { name: "Omar Hassan", username: "omarh" },
];

function generateMockPhoto(id: number): UnsplashPhoto {
  const author = AUTHORS[id % AUTHORS.length];
  const width = 1080 + Math.floor(Math.random() * 1920);
  const height = 1080 + Math.floor(Math.random() * 1920);
  const color = COLORS[id % COLORS.length];

  return {
    id: `mock-${id}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    width,
    height,
    color,
    blur_hash: "L6P0f00a00a{~q%M9at7%M9a00a{",
    likes: Math.floor(Math.random() * 5000),
    liked_by_user: false,
    description: TITLES[id % TITLES.length],
    alt_description: TITLES[id % TITLES.length].toLowerCase().replace(/\s+/g, "-"),
    user: {
      id: `user-${id}`,
      username: author.username,
      name: author.name,
      profile_image: {
        small: `https://i.pravatar.cc/100?u=${author.username}`,
        medium: `https://i.pravatar.cc/200?u=${author.username}`,
        large: `https://i.pravatar.cc/400?u=${author.username}`,
      },
    },
    urls: {
      raw: `https://picsum.photos/seed/${id}/${width}/${height}`,
      full: `https://picsum.photos/seed/${id}/1600/1200`,
      regular: `https://picsum.photos/seed/${id}/1080/720`,
      small: `https://picsum.photos/seed/${id}/400/300`,
      thumb: `https://picsum.photos/seed/${id}/200/150`,
    },
  };
}

const TOTAL_MOCK_PHOTOS = 50;
const mockPhotos: UnsplashPhoto[] = Array.from({ length: TOTAL_MOCK_PHOTOS }, (_, i) => generateMockPhoto(i + 1));

export function getMockPhotos(page: number = 1): UnsplashListResponse {
  const perPage = 30;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return mockPhotos.slice(start, end);
}

export function getMockSearchPhotos(query: string, page: number = 1): UnsplashSearchResponse {
  const perPage = 30;
  const filtered = mockPhotos.filter(
    (p) =>
      p.alt_description?.toLowerCase().includes(query.toLowerCase()) ||
      p.user.name.toLowerCase().includes(query.toLowerCase())
  );
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    total: filtered.length,
    total_pages: Math.ceil(filtered.length / perPage),
    results: filtered.slice(start, end),
  };
}

export function getMockRandomPhotos(count: number = 10): UnsplashListResponse {
  const shuffled = [...mockPhotos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getMockPhotoById(id: string): UnsplashPhoto | undefined {
  if (id.startsWith("mock-")) {
    return mockPhotos.find((p) => p.id === id);
  }
  const num = parseInt(id, 10);
  if (!isNaN(num) && num > 0 && num <= TOTAL_MOCK_PHOTOS) {
    return generateMockPhoto(num);
  }
  return mockPhotos[0];
}
