"use server";

import { getAuthToken } from "@/lib/utils/auth.token";
import { revalidatePath } from "next/cache";

export default async function uploadFrames(formData: FormData) {
  const token = await getAuthToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/frames`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to upload frames");
  }

  const payload: APIResponse<unknown> = await response.json();
  revalidatePath("/settings");
  return payload;
}
