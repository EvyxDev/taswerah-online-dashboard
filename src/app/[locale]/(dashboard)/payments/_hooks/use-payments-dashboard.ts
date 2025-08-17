import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetPaymentsDashboardByBranch } from "@/lib/api/payments.api";

export function usePaymentsDashboard(branchId: string) {
  const { data } = useSession();
  const token = data?.token;
  return useQuery({
    queryKey: ["PaymentsDashboard", branchId, token],
    queryFn: () => GetPaymentsDashboardByBranch(token || "", branchId),
    enabled: !!token && !!branchId,
    placeholderData: keepPreviousData,
  });
}
