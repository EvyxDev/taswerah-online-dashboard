import { Suspense } from "react";
import { GetAllEmployees, GetAllPhotographers } from "@/lib/api/employees.api";
import EmployeesPage from "./_components/employees-page";
import { EmployeeTableSkeleton } from "./_components/employee-skeleton";

async function EmployeesData({ page = 1, limit = 10 }) {
  const employeesData = await GetAllEmployees(page, limit);
  const photographersData = await GetAllPhotographers(page, limit);

  return (
    <EmployeesPage
      employees={employeesData.data}
      PhotoGraphers={photographersData.data}
    />
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  return (
    <Suspense fallback={<EmployeeTableSkeleton />}>
      <EmployeesData page={page} limit={limit} />
    </Suspense>
  );
}
