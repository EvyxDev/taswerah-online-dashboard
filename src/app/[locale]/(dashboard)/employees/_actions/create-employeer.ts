/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

export default async function createEmployeer(data: CreateBranchManagerBody) {
  const response = await fetch(
    `https://taswera.evyx.lol/api/branch-manager/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create branch manager");
  }
  console.log(response);
  const payload: APIResponse<CreateBranchManagerResponse> =
    await response.json();

  return payload;
}
