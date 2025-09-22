import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetEmployeesByBranch } from "@/lib/api/client.api";

export function useEmployees(branchId?: string) {
  const { data } = useSession();
  const token = data?.token;
  return useQuery<APIResponse<BranchEmployee[]>>({
    queryKey: ["employees", token, branchId],
    queryFn: () => GetEmployeesByBranch(token || "", branchId as string),
    enabled: !!token && !!branchId,
  });
}
