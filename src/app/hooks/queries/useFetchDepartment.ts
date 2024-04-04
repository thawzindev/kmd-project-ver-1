import { getCategoryList, getDepartmentList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchDepartment = (search?: string) => {
  return useQuery({
    queryKey: ["departments", search],
    queryFn: () => getDepartmentList(search),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
