import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import BranshesTable from "./branshes-table";
import { useTranslations } from "next-intl";

export default function BranshesPage() {
  const t = useTranslations();
  return (
    <div className="space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
              {t("navigation.branches")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-10">
        <BranshesTable />
      </div>
    </div>
  );
}
