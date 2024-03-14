import { getCategoryList, getDepartmentList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchDepartment = (perPage: number, page: number) => {
  return useQuery({
    queryKey: [`categories`, perPage, page],
    queryFn: () => getDepartmentList(perPage, page),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
