import { getCategoryList } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = (perPage: number, page: number) => {
  return useQuery({
    queryKey: [`categories`, perPage, page],
    queryFn: () => getCategoryList(perPage, page),
    retry: false,
  });
};
