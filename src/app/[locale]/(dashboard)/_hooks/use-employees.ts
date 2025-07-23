import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetAllEmployees } from "@/lib/api/client.api";

export function useEmployees() {
  const { data } = useSession();
  const token = data?.token;
  return useQuery({
    queryKey: ["employees", token],
    queryFn: () => GetAllEmployees(token || ""),
    enabled: !!token,
  });
}
