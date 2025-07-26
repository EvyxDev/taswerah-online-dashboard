/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";
import { revalidatePath } from "next/cache";

export default async function createEmployeer(data: CreateBranchManagerBody) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/onlinedashboard/admin/employees`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  const payload: APIResponse<CreateBranchManagerResponse> =
    await response.json();
  revalidatePath("/employees");

  return payload;
}
