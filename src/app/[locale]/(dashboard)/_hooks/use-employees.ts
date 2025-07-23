import { useQuery } from "@tanstack/react-query";
import { GetAllBranshes } from "@/lib/api/branches.api";
import { useSession } from "next-auth/react";

export function useEmployees() {
  const { data } = useSession();
  const token = data?.token;
  return useQuery({
    queryKey: ["employees", token],
    queryFn: () => GetAllBranshes(token || ""),
    enabled: !!token,
  });
}
