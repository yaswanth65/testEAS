import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCuratedPhotos, getRandomPhotos } from "../services/unsplash";
import type { UnsplashPhoto } from "../types";

export function useCuratedPhotos() {
  return useInfiniteQuery({
    queryKey: ["curatedPhotos"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getCuratedPhotos(pageParam);
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 30) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRandomPhotos() {
  return useQuery({
    queryKey: ["randomPhotos"],
    queryFn: () => getRandomPhotos(10),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePhotoById(id: string | undefined) {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: async () => {
      const { getPhotoById } = await import("../services/unsplash");
      return id ? getPhotoById(id) : null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
