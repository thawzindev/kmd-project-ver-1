import { getCategoryList, getReports } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchReports = (perPage: number, page: number, keyword?: string) => {
  return useQuery({
    queryKey: [`reports`, { perPage, page, keyword }],
    queryFn: () => getReports(perPage, page, keyword),
    retry: false,
    placeholderData: keepPreviousData,
    // enabled: false,
    enabled: !!{ perPage, page, keyword },
  });
};
