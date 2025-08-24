import BranshesPage from "./_components/branshes-page";
import { Suspense } from "react";
import { EmployeeTableSkeleton } from "../employees/_components/employee-skeleton";
import { GetAllBranshes } from "@/lib/api/branches.api";
import { getAuthToken } from "@/lib/utils/auth.token";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const token = await getAuthToken();
  const search = searchParams.search;

  const branches = await GetAllBranshes(token || "");

  // Simple client-side search if needed
  let filteredBranches = branches;
  if (search) {
    filteredBranches = branches.filter((branch) =>
      branch.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Suspense fallback={<EmployeeTableSkeleton />}>
      <BranshesPage branshes={filteredBranches} />
    </Suspense>
  );
}
