import { getCategoryList, getDepartmentList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchDepartment = (perPage: number, page: number, search?: string) => {
  return useQuery({
    queryKey: [`categories`, perPage, page, search],
    queryFn: () => getDepartmentList(perPage, page, search),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
