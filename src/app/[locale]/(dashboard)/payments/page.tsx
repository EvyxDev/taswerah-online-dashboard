import { getAuthToken } from "@/lib/utils/auth.token";
import PaymentPage from "./_components/payment-page";
import { GetAllBranshes } from "@/lib/api/branches.api";

export default async function Page() {
  const token = await getAuthToken();
  const Branshes = await GetAllBranshes(token || "");
  return (
    <>
      <PaymentPage branches={Branshes} />
    </>
  );
}
