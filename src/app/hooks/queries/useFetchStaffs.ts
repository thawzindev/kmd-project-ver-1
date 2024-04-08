import { getStaffList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchStaffs = (perPage: number, page: number) => {
  return useQuery({
    queryKey: [`staffs`, perPage, page],
    queryFn: () => getStaffList(perPage, page),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
