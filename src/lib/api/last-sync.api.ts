/* eslint-disable @typescript-eslint/no-explicit-any */

export type LastSyncData = { id: number | null; synced_at: string | null };

export async function GetLastSyncClient(): Promise<LastSyncData> {
  try {
    const response = await fetch(`/api/sync/last`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch last sync. Status: ${response.status}`);
    }

    const raw = await response.json();
    const data = raw?.data ?? null;
    return {
      id: data?.id ?? null,
      synced_at: data?.synced_at ?? null,
    };
  } catch (error: any) {
    return { id: null, synced_at: null };
  }
}
