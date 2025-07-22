/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";

export default async function createPhotographer(data: CreatePhotographerBody) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographer`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create photographer");
  }
  const payload: APIResponse<CreateBranchManagerResponse> =
    await response.json();

  return payload;
}
