"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import BranshesTable from "./branshes-table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";

type Props = {
  branshes: Branch[];
  pagination: {
    currentPage: number;
    totalPages: number[];
    limit: number;
  };
};
export default function BranshesPage({ branshes, pagination }: Props) {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("limit", pagination.limit.toString());

    // Update URL with new parameters
    router.push(`${pathname}?${params.toString()}`);
  };

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
        <BranshesTable
          branshes={branshes}
          onPageChange={handlePageChange}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages[0]}
        />
      </div>
    </div>
  );
}
