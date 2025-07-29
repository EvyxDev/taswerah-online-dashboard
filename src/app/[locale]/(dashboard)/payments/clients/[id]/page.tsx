import { GetClentsByBranch } from "@/lib/api/client.api";
import ClientPage from "./_components/client-page";
import { getAuthToken } from "@/lib/utils/auth.token";

export default async function Page() {
  const token = await getAuthToken();
  const clients = await GetClentsByBranch(token || "", "3");
  console.log(clients);

  return <ClientPage clients={clients.data} />;
}
