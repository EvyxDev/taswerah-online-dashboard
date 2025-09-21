/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface BranshesResponse {
  data: Branch[];
}

export async function GetAllBranshes(token: string): Promise<Branch[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/branches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const payload: APIResponse<Branch[]> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload.data;
  } catch (error: any) {
    console.error("GetAllBranshes error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Branshes"
    );
  }
}

// Since the new API doesn't support pagination, we'll use the simple GetAllBranshes function
export async function GetAllPaginatedBranshes(
  token = "",
  search?: string
): Promise<{ data: Branch[] }> {
  try {
    const branches = await GetAllBranshes(token);

    // Simple client-side search if needed
    let filteredBranches = branches;
    if (search) {
      filteredBranches = branches.filter((branch) =>
        branch.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return { data: filteredBranches };
  } catch (error: any) {
    console.error("GetAllPaginatedBranshes error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Branshes"
    );
  }
}

export type BranchLastSync = {
  branch_id: number;
  branch_name: string;
  last_sync_job_id: number | null;
  last_sync_time: string | null;
};

export async function GetBranchesLastSync(): Promise<BranchLastSync[]> {
  try {
    const response = await fetch(`/api/branches/last-sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch branches last sync. Status: ${response.status}`
      );
    }

    const raw = await response.json();
    const data = (raw?.data ?? []) as BranchLastSync[];
    return data;
  } catch (error: any) {
    console.error("GetBranchesLastSync error:", error);
    return [];
  }
}

// Server-side variant for use in Server Components/Pages only
// Server variant moved to src/lib/api/branches.server.ts
