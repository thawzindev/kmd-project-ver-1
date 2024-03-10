import { getCategoryList } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = (perPage: number) => {
  return useQuery({
    queryKey: [`categories`, perPage],
    queryFn: () => getCategoryList(perPage),
    retry: false,
  });
};
