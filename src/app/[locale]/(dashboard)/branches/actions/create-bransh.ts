/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";
import { revalidatePath } from "next/cache";

export default async function createBransh(data: CreateBranchBody) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/branches`,
    {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        is_active: true
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create branch");
  }
  const payload: APIResponse<CreateBranchManagerResponse> =
    await response.json();
  revalidatePath("/branches");

  return payload;
}
