/* eslint-disable @typescript-eslint/no-explicit-any */
interface BranshesResponse {
  data: Branch[];
}
export async function GetAllBranshes(token: string): Promise<Branch[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/branches`,
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

    const payload: APIResponse<BranshesResponse> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload.data.data;
  } catch (error: any) {
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Branshes"
    );
  }
}
