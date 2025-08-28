"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import CardSection from "../../_components/card-sectoin";
import ChartsSectoin from "../../_components/charts-sectoin";
import DashTable from "../../_components/dash-table";
import { SelectGroup } from "@radix-ui/react-select";

export default function PaymentPage({
  branches,
  selectedBranchId,
  initialData,
}: {
  branches: Branch[];
  selectedBranchId: string;
  initialData: homeStates | null;
}) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentBranchId, setCurrentBranchId] = useState(selectedBranchId);

  const handleBranchChange = (branchId: string) => {
    setCurrentBranchId(branchId);

    // Update URL with selected branch
    const params = new URLSearchParams(searchParams);
    params.set("branch_id", branchId);
    router.push(`?${params.toString()}`);
  };

  // Use initial data
  const displayData = initialData;

  return (
    <div className="space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje rtl:font-almarai text-sm text-gray-400">
              {t("navigation.payments")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-10 space-y-8">
        {/* Branch Selection Dropdown */}
        <div className="w-full">
          <Select value={currentBranchId} onValueChange={handleBranchChange}>
            <SelectGroup className="p-0">
              <SelectLabel className="text-2xl font-homenaje rtl:font-almarai font-medium p-0">
                {t("select-label")}
              </SelectLabel>
              <SelectTrigger className="w-80 text-2xl font-homenaje rtl:font-almarai py-6 px-6 rounded-2xl bg-[#FAFAFA] border-2 border-gray-200 hover:bg-gray-100 focus:bg-white">
                <SelectValue placeholder={t("dashboard.selectBranch")} />
              </SelectTrigger>
            </SelectGroup>
            <SelectContent className="rounded-xl max-h-[300px]">
              {branches.map((branch) => (
                <SelectItem
                  key={branch.id}
                  value={branch.id.toString()}
                  className="text-lg font-homenaje rtl:font-almarai py-3 pl-8 pr-4 cursor-pointer hover:bg-gray-100"
                >
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dashboard Content */}
        {displayData && (
          <>
            <CardSection syncJobsStats={displayData} />
            <ChartsSectoin syncJobsStats={displayData} />
            <DashTable syncJobs={displayData.jobs} />
          </>
        )}

        {/* No Data State */}
        {!displayData && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              {t("dashboard.pleaseSelectBranch")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
