import { GethomeStates } from "@/lib/api/home.api";
import { GetBranchesLastSyncServer } from "@/lib/api/branches.server";
import DashBoard from "./_components/dash-board";

export default async function Home() {
  const homeStates = await GethomeStates();
  const branchesLastSync = await GetBranchesLastSyncServer();
  return (
    <>
      <DashBoard homeStates={homeStates} branchesLastSync={branchesLastSync} />
    </>
  );
}
