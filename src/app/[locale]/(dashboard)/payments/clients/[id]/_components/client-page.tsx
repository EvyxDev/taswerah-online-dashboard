import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ClientTable from "./client-table";
import { useTranslations } from "next-intl";

export default function ClientPage({ clients }: { clients: Client[] }) {
  const t = useTranslations();
  return (
    <>
      <div className=" space-y-8 px-6 xl:px-10 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href="/payments">
              <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
                {t("navigation.payments")}
              </BreadcrumbPage>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
                {t("dashboard.clients")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="py-10 space-y-8">
          <ClientTable clients={clients} />
        </div>
      </div>
    </>
  );
}
