import { Suspense } from "react";
import { GetAllEmployees, GetAllPhotographers } from "@/lib/api/employees.api";
import EmployeesPage from "./_components/employees-page";
import { EmployeeTableSkeleton } from "./_components/employee-skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(searchParams.limit) || 10));
  const search = searchParams.search;

  const [employeesData, photographersData] = await Promise.all([
    GetAllEmployees(page, limit, search),
    GetAllPhotographers(page, limit, search),
  ]);

  return (
    <Suspense fallback={<EmployeeTableSkeleton />}>
      <EmployeesPage
        employees={employeesData.data}
        PhotoGraphers={photographersData.data}
        pagination={{
          currentPage: page,
          totalPages: [
            Math.max(1, employeesData.data.meta?.last_page),
            Math.max(1, photographersData.data.meta?.last_page),
          ],
          limit,
        }}
      />
    </Suspense>
  );
}
