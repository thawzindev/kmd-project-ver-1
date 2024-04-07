import { getCategoryList, getNotifications, getProfile, getStaffList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchProfile = () => {
  return useQuery({
    queryKey: [`profile`],
    queryFn: () => getProfile(),
    retry: false,
    placeholderData: keepPreviousData});
};
