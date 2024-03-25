import { getCategoryList, getStaffList, getStatistics } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchStatistics = () => {
  return useQuery({
    queryKey: [`statistics`],
    queryFn: () => getStatistics(),
    retry: false,
  });
};
