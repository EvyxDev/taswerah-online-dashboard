import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetPaymentsByBransh } from "@/lib/api/payments.api";

export function usePaymentsByBransh(id: string) {
  const { data } = useSession();
  const token = data?.token;
  return useQuery({
    queryKey: ["PaymentsByBransh", token],
    queryFn: () => GetPaymentsByBransh(token || "", id),
    enabled: !!token,
  });
}
