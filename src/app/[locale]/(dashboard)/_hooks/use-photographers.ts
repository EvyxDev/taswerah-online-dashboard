import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetAllPhotographers } from "@/lib/api/client.api";

export function usePhotographers() {
  const { data } = useSession();
  const token = data?.token;
  return useQuery({
    queryKey: ["photographers", token],
    queryFn: () => GetAllPhotographers(token || ""),
    enabled: !!token,
  });
}
