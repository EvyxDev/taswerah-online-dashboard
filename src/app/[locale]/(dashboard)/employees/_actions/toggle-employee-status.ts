/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";
import { revalidatePath } from "next/cache";

interface ToggleEmployeeStatusBody {
  name: string;
  branch_id: number;
}

export default async function toggleEmployeeStatus(
  employeeId: string | number,
  data: ToggleEmployeeStatusBody
) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/${employeeId}/toggle-status`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to toggle employee status");
  }

  const payload: APIResponse<any> = await response.json();
  revalidatePath("/employees");

  return payload;
}
