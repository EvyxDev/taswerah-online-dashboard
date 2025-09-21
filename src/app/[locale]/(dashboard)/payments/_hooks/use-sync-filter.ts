import { useQuery } from "@tanstack/react-query";
import {
  GetSyncFilter,
  type SyncFilterResponse,
} from "@/lib/api/sync-filter.api";

export default function usePaymentsSyncFilter(params: {
  employee_id?: string;
  employeeName?: string;
  from?: string;
  to?: string;
  branch_id?: string;
}) {
  const { data, isLoading, error, refetch } = useQuery<SyncFilterResponse>({
    queryKey: ["payments-sync-filter", params],
    queryFn: () => GetSyncFilter(params),
    enabled: false,
    staleTime: 0,
  });

  return {
    syncFilterData: data,
    isLoading,
    error,
    refetch,
  };
}
