/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "@/lib/utils/auth.token";

export async function GET(_request: NextRequest) {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/branches/last-sync`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }
    return NextResponse.json(payload);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch branches last sync",
      },
      { status: 500 }
    );
  }
}
