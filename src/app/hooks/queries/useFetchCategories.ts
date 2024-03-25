import { getCategoryList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchCategories = (perPage: number, page: number, keyword?: string) => {
  return useQuery({
    queryKey: [`categories`, { perPage, page, keyword }],
    queryFn: () => getCategoryList(perPage, page, keyword),
    retry: false,
    placeholderData: keepPreviousData,
    // enabled: false,
    enabled: !!{ perPage, page, keyword },
  });
};
