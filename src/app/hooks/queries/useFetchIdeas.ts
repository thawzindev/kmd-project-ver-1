import { getIdeaList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchIdeas = (perPage: number, page: number, queryString?: string) => {
  return useQuery({
    queryKey: [`ideas`, perPage, page, queryString],
    queryFn: () => getIdeaList(perPage, page, queryString),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
