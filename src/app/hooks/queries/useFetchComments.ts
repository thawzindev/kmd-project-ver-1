import { getCategoryList, getComments, getDepartmentList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchComments = (perPage: number, page: number, slug: string) => {
  return useQuery({
    queryKey: [`comments`, perPage, page, slug],
    queryFn: () => getComments(perPage, page, slug),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
