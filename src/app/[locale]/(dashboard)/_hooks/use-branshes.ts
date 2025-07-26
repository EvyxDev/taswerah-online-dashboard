import { useQuery } from "@tanstack/react-query";
import { GetAllBranshes } from "@/lib/api/branches.api";

export function useBranches(token: string) {
  return useQuery({
    queryKey: ["branches", token],
    queryFn: () => GetAllBranshes(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}
