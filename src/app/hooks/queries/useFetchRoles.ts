import { getRoleList } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchRole = () => {
  return useQuery({
    queryKey: [`role`],
    queryFn: () => getRoleList(),
    retry: false,
  });
};
