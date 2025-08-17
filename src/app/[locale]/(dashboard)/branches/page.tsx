import BranshesPage from "./_components/branshes-page";
import { Suspense } from "react";
import { EmployeeTableSkeleton } from "../employees/_components/employee-skeleton";
import { GetAllPaginatedBranshes } from "@/lib/api/branches.api";
import { getAuthToken } from "@/lib/utils/auth.token";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string };
}) {
  const token = await getAuthToken();
  const page = Math.max(1, Number(searchParams.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(searchParams.limit) || 10));
  const search = searchParams.search;

  const Brnashes = await GetAllPaginatedBranshes(
    token || "",
    page,
    limit,
    search
  );
  return (
    <Suspense fallback={<EmployeeTableSkeleton />}>
      <BranshesPage
        branshes={Brnashes.data}
        pagination={{
          currentPage: page,
          totalPages: [Math.max(1, Brnashes.meta.last_page)],
          limit,
        }}
      />
    </Suspense>
  );
}
