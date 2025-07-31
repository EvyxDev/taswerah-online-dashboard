"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesTable from "./employees-table";
import PhotographersTable from "./photographers-table";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

type Props = {
  employees: PaginatedEmployees;
  PhotoGraphers: PaginatedPhGraphers;
  pagination: {
    currentPage: number;
    totalPages: number[];
    limit: number;
  };
};

export default function EmployeesPage({
  employees,
  PhotoGraphers,
  pagination,
}: Props) {
  // Translation
  const t = useTranslations("employees");
  const locale = useLocale();

  // Router
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [activeTab, setActiveTab] = useState("employees");

  // Handle tab change with page reset
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);

    // Reset to page 1 when switching tabs
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", pagination.limit.toString());

    // Update URL with reset parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("limit", pagination.limit.toString());

    // Update URL with new parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  console.log("Total Pages: ", employees);

  return (
    <div className="space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
              {activeTab === "employees"
                ? t("employeesTab")
                : t("photographersTab")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-10">
        <Tabs
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={activeTab}
          onValueChange={handleTabChange} // Use custom handler instead of setActiveTab
          className="w-full"
        >
          <TabsList
            className="bg-transparent gap-5 h-auto p-0 justify-start"
            style={{
              direction: locale === "ar" ? "rtl" : "ltr",
            }}
          >
            <TabsTrigger
              value="employees"
              className="text-3xl font-homenaje py-4 px-8 rounded-2xl transition-colors data-[state=active]:bg-black data-[state=active]:text-white bg-[#FAFAFA] text-black hover:bg-gray-200 data-[state=active]:shadow-none"
            >
              {t("employeesTab")}
            </TabsTrigger>
            <TabsTrigger
              value="photographers"
              className="text-3xl font-homenaje py-4 px-8 rounded-2xl transition-colors data-[state=active]:bg-black data-[state=active]:text-white bg-[#FAFAFA] text-black hover:bg-gray-200 data-[state=active]:shadow-none"
            >
              {t("photographersTab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="mt-10">
            <EmployeesTable
              employees={employees}
              onPageChange={handlePageChange}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages[0]}
            />
          </TabsContent>

          <TabsContent value="photographers" className="mt-10">
            <PhotographersTable
              PhotoGraphers={PhotoGraphers}
              onPageChange={handlePageChange}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages[1]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
