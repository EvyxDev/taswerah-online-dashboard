"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function EmployeesPage({
  employees,
  PhotoGraphers,
}: {
  employees: PaginatedEmployees;
  PhotoGraphers: PaginatedPhGraphers;
}) {
  // Translation
  const t = useTranslations("employees");
  const locale = useLocale();

  // Router
  const router = useRouter();
  const searchParams = useSearchParams();

  // States
  const [activeTab, setActiveTab] = useState("employees");
  
  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

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
          onValueChange={setActiveTab}
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
              currentPage={Number(searchParams.get("page")) || 1}
            />
          </TabsContent>

          <TabsContent value="photographers" className="mt-10">
            <PhotographersTable 
              PhotoGraphers={PhotoGraphers} 
              onPageChange={handlePageChange}
              currentPage={Number(searchParams.get("page")) || 1}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
