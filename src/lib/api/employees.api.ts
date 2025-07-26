/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "../utils/auth.token";

// Get all employees
export async function GetAllEmployees(page = 1, limit = 10) {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/?page=${page}&limit=${limit}`,
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

    const payload: APIResponse<PaginatedEmployees> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error: any) {
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Employees"
    );
  }
}

// Get all Photographers
export async function GetAllPhotographers(page = 1, limit = 10) {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographers?page=${page}&limit=${limit}`,
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

    const payload: APIResponse<PaginatedPhGraphers> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error: any) {
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Photographers"
    );
  }
}
