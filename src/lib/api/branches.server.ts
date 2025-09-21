/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "@/lib/utils/auth.token";

export type BranchLastSync = {
  branch_id: number;
  branch_name: string;
  last_sync_job_id: number | null;
  last_sync_time: string | null;
};

export async function GetBranchesLastSyncServer(): Promise<BranchLastSync[]> {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/branches/last-sync`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch branches last sync. Status: ${response.status}`
      );
    }

    const raw = await response.json();
    const data = (raw?.data ?? []) as BranchLastSync[];
    return data;
  } catch (error: any) {
    console.error("GetBranchesLastSyncServer error:", error);
    return [];
  }
}
