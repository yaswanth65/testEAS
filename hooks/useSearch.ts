import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPhotos } from "../services/unsplash";

export function useSearch(query: string) {
  return useInfiniteQuery({
    queryKey: ["searchPhotos", query],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await searchPhotos(query, pageParam);
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (pages.length >= lastPage.total_pages) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
