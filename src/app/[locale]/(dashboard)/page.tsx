import { GethomeStates } from "@/lib/api/home.api";
import DashBoard from "./_components/dash-board";

export default async function Home() {
  const homeStates = await GethomeStates();
  return (
    <>
      <DashBoard homeStates={homeStates} />
    </>
  );
}
