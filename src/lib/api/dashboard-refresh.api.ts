"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "../utils/auth.token";

export async function RefreshDashboardData(): Promise<homeStates> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${process.env.API}/sync-jobs/statistics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const payload = await response.json();

    if (!payload.success) {
      throw new Error(payload.message);
    }

    return payload.data;
  } catch (error: any) {
    console.error("RefreshDashboardData error:", error);
    throw new Error(
      error?.message ||
        "Unexpected error occurred while refreshing dashboard data"
    );
  }
}
