/* eslint-disable @typescript-eslint/no-explicit-any */

// Get all employees
export async function GetClentsByBranch(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/payments/clients/${id}}`,
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

    const payload: APIResponse<Client[]> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error: any) {
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Clients"
    );
  }
}
