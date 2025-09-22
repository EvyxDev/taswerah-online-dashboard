import { getAuthToken } from "@/lib/utils/auth.token";
import PaymentPage from "./_components/payment-page";
import { GetAllBranshes } from "@/lib/api/branches.api";
import { GetBranchSyncJobsStats } from "@/lib/api/home.api";
import { GetEmployeesByBranch } from "@/lib/api/client.api";

export default async function Page({
  searchParams,
}: {
  searchParams: { branch_id?: string };
}) {
  const token = await getAuthToken();
  const branches = await GetAllBranshes(token || "");

  // Default to first branch if none selected
  const defaultBranchId = branches.length > 0 ? branches[0].id.toString() : "";
  const selectedBranchId = searchParams.branch_id || defaultBranchId;

  // Fetch data for selected branch
  let branchData = null;
  let employees: BranchEmployee[] = [];
  if (selectedBranchId) {
    branchData = await GetBranchSyncJobsStats(selectedBranchId);
    const employeesResp = await GetEmployeesByBranch(
      token || "",
      selectedBranchId
    );
    if ("data" in employeesResp) {
      employees = employeesResp.data || [];
    }
  }

  return (
    <>
      <PaymentPage
        branches={branches}
        selectedBranchId={selectedBranchId}
        initialData={branchData}
        employees={employees}
      />
    </>
  );
}
