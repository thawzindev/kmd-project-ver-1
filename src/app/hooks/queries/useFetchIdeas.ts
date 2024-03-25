import { getIdeaList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchIdeas = (perPage: number, page: number) => {
  return useQuery({
    queryKey: [`ideas`, perPage, page],
    queryFn: () => getIdeaList(perPage, page),
    retry: false,
    placeholderData: keepPreviousData,
  });
};