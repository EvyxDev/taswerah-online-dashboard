/* eslint-disable @typescript-eslint/no-explicit-any */
interface BranshesResponse {
  data: Branch[];
}
export async function GetAllBranshes(token: string): Promise<Branch[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API
      }/onlinedashboard/admin/branches?page=${1}&limit=${200}`,
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
interface BranshesPaginatedResponse {
  data: Branch[];
  links: PaginationLinks;
  meta: PaginationMeta;
  photographer_count: number;
}
export async function GetAllPaginatedBranshes(
  token = "",
  page = 1,
  limit = 10
): Promise<BranshesPaginatedResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/branches?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          cache: "no-store",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const payload: APIResponse<BranshesPaginatedResponse> =
      await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload.data;
  } catch (error: any) {
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Branshes"
    );
  }
}
