/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "../utils/auth.token";

export async function GethomeStates(): Promise<homeStates> {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sync-jobs/statistics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const payload: APIResponse<homeStates> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }
    console.log(payload);

    return payload.data;
  } catch (error: any) {
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Home States"
    );
  }
}

export async function GetBranchSyncJobsStats(
  branchId: string
): Promise<homeStates> {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sync-jobs/statistics?branch_id=${branchId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const payload: APIResponse<homeStates> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload.data;
  } catch (error: any) {
    console.error("GetBranchSyncJobsStats error:", error);
    throw new Error(
      error?.message ||
        "Unexpected error occurred while fetching Branch Sync Jobs Stats"
    );
  }
}
