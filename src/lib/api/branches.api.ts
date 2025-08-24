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
