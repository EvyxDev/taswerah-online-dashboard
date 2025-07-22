/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "../utils/auth.token";

export async function GethomeStates(): Promise<homeStates> {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/homepage/stats`,
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
