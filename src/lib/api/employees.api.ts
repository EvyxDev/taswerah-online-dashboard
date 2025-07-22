/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "../utils/auth.token";

// Get all employees
export async function GetAllEmployees() {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/?page=1&limit=10`,
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

    const payload: APIResponse<EmployeesResponse> = await response.json();

    // console.log("Employees: ", payload);

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error: any) {
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Home States"
    );
  }
}

// Get all Photographers
export async function GetAllPhotographers() {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographers?page=1&limit=10`,
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

    const payload: APIResponse<PhGrapherResponse> = await response.json();

    console.log("Photoooooooo: ", payload);

    if (!("data" in payload)) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error: any) {
    console.error("GethomeStates error:", error);
    throw new Error(
      error?.message || "Unexpected error occurred while fetching Home States"
    );
  }
}
