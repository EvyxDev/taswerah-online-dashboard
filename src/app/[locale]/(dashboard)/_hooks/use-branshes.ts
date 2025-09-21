import { useQuery } from "@tanstack/react-query";
import { GetAllBranshes } from "@/lib/api/branches.api";
import { GetLastSyncClient } from "@/lib/api/last-sync.api";

export function useBranches(token: string) {
  return useQuery({
    queryKey: ["branches"],
    queryFn: () => GetAllBranshes(token),
    enabled: !!token,
  });
}

export function useLastSync() {
  return useQuery({
    queryKey: ["last-sync"],
    queryFn: GetLastSyncClient,
    refetchInterval: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
