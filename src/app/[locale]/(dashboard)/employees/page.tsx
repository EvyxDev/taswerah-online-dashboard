import { GetAllEmployees, GetAllPhotographers } from "@/lib/api/employees.api";
import EmployeesPage from "./_components/employees-page";

export default async function Page() {
  const employeesData = await GetAllEmployees();
  const employees = employeesData.data;

  const photographersData = await GetAllPhotographers();
  const photographers = photographersData.data;

  console.log("ُEmployees Data: ", employees.data);

  return (
    <>
      <EmployeesPage
        employees={employees.data}
        PhotoGraphers={photographers.data}
      />
    </>
  );
}
