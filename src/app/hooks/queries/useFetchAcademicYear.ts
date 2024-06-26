import { getAcademicYearList } from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchAcedamicYear = (perPage: number, page: number) => {
  return useQuery({
    queryKey: [`academics`, perPage, page],
    queryFn: () => getAcademicYearList(perPage, page),
    retry: false,
    placeholderData: keepPreviousData,
  });
};
