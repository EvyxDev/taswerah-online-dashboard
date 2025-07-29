import { useQuery } from "@tanstack/react-query";
import { GetAllBranshes } from "@/lib/api/branches.api";

export function useBranches(token: string) {
  return useQuery({
    queryKey: ["branches"],
    queryFn: () => GetAllBranshes(token),
    enabled: !!token,
  });
}
