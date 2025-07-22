/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";

export default async function deleteEmployeer(id: string) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  const payload: APIResponse<any> = await response.json();
  return payload;
}
