import { getServerSession } from "next-auth";
import DashBoard from "./_components/dash-board";
import { authOptions } from "@/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <DashBoard />
    </>
  );
}
