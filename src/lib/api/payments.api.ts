/* eslint-disable @typescript-eslint/no-explicit-any */

export async function GetPaymentsByBransh(
  token: string,
  id: string
): Promise<homeStates> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/payments/${id}`,
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
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Home States"
    );
  }
}
