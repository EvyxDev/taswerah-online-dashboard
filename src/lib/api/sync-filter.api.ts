/* eslint-disable @typescript-eslint/no-explicit-any */

export type SyncFilterResponse = {
  sync_jobs: Array<{
    id: number | string;
    employeeName: string;
    employee_id?: number | string | null;
    orderprefixcode: string;
    pay_amount: number | string;
    status: string;
    shift_name?: string;
    orderphone: string;
    number_of_photos: number;
    created_at: string;
    updated_at: string;
  }>;
  statistics: {
    total_photos: number;
    total_money: number;
  };
};

export async function GetSyncFilter(params: {
  employee_id?: string;
  employeeName?: string;
  from?: string;
  to?: string;
  branch_id?: string;
}): Promise<SyncFilterResponse> {
  try {
    const query = new URLSearchParams();
    if (params.employee_id) query.set("employee_id", params.employee_id);
    if (params.employeeName) query.set("employeeName", params.employeeName);
    if (params.from) query.set("from", params.from);
    if (params.to) query.set("to", params.to);
    if (params.branch_id) query.set("branch_id", params.branch_id);

    const href = `/api/sync/filter${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    const response = await fetch(href, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch sync filter data. Status: ${response.status} ${errorText}`
      );
    }

    const raw = await response.json();

    // If already in desired shape
    if (raw && "sync_jobs" in raw && "statistics" in raw) {
      return raw as SyncFilterResponse;
    }

    // Some backends return { data: { jobs: [...], total_money, total_photos }, message }
    const maybeData = raw?.data ?? raw;
    if (maybeData && Array.isArray(maybeData.jobs)) {
      const normalized: SyncFilterResponse = {
        sync_jobs: maybeData.jobs,
        statistics: {
          total_photos: Number(maybeData.total_photos ?? 0),
          total_money: Number(maybeData.total_money ?? 0),
        },
      };
      return normalized;
    }

    throw new Error("Unexpected sync filter response shape");
  } catch (error: any) {
    throw new Error(
      error?.message || "Unexpected error during sync filter data fetch"
    );
  }
}
