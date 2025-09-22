/* eslint-disable @typescript-eslint/no-explicit-any */

export type SyncFilterResponse = {
  sync_jobs: Array<{
    id: number | string;
    branch_id?: number | string | null;
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
  employee_photos_summary?: Array<{
    employee_id?: number | string | null;
    branch_id?: number | string | null;
    employeeName: string;
    total_photos: number;
  }>;
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
    console.log("Raw API response:", raw); // Debug log

    // Handle the actual API structure: { message: "...", data: { jobs: [...], total_photos: ..., total_money: ..., employee_photos_summary: [...] } }
    if (raw && raw.data && Array.isArray(raw.data.jobs)) {
      const normalized: SyncFilterResponse = {
        sync_jobs: raw.data.jobs,
        statistics: {
          total_photos: Number(raw.data.total_photos ?? 0),
          total_money: Number(raw.data.total_money ?? 0),
        },
        employee_photos_summary: raw.data.employee_photos_summary || [],
      };
      console.log("Normalized response:", normalized); // Debug log
      return normalized;
    }

    // Fallback: If already in desired shape (this probably won't happen based on your API)
    if (raw && "sync_jobs" in raw && "statistics" in raw) {
      return raw as SyncFilterResponse;
    }

    throw new Error("Unexpected sync filter response shape");
  } catch (error: any) {
    throw new Error(
      error?.message || "Unexpected error during sync filter data fetch"
    );
  }
}
