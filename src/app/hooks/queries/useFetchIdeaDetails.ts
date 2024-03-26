import { getIdeaDetail} from "@/routes/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchIdeaDetails = (slug: string) => {
  return useQuery({
    queryKey: [`ideas`, slug],
    queryFn: () => getIdeaDetail(slug),
    retry: false,
    placeholderData: keepPreviousData,
  });
};