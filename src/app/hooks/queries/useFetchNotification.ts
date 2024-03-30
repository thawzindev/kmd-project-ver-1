import { getCategoryList, getNotifications, getStaffList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchNotification = (perPage: number, page?: number) => {
  return useQuery({
    queryKey: [`notification`, perPage, page],
    queryFn: () => getNotifications(perPage, page),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
