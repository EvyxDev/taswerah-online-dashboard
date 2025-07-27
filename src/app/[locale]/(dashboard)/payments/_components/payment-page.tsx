"use client";

import { useState } from "react";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import PaymentSectoin from "./payment-sectoins";

export default function PaymentPage({ branches }: { branches: Branch[] }) {
  const t = useTranslations();

  const activeBranches = branches.filter((branch) => branch.is_active);

  const [selectedBranchId, setSelectedBranchId] = useState<string>(() => {
    const defaultBranch =
      activeBranches.find((b) => b.id === 3) || activeBranches[0];
    return defaultBranch ? defaultBranch.id.toString() : "";
  });
  console.log(activeBranches);
  return (
    <div className="space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
              {t("navigation.payments")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-10">
        <div className="w-full">
          {/* Branch Selection Dropdown */}
          <div className="mb-8">
            <Select
              value={selectedBranchId}
              onValueChange={setSelectedBranchId}
            >
              <SelectTrigger className="w-80 text-2xl font-homenaje py-6 px-6 rounded-2xl bg-[#FAFAFA] border-2 border-gray-200 hover:bg-gray-100 focus:bg-white">
                <SelectValue placeholder={t("payments.selectBranch")} />
              </SelectTrigger>
              <SelectContent className="rounded-xl max-h-[300px]">
                {activeBranches.map((branch) => (
                  <SelectItem
                    key={branch.id}
                    value={branch.id.toString()}
                    className="text-lg font-homenaje py-3 pl-8 pr-4 cursor-pointer hover:bg-gray-100"
                  >
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          {selectedBranchId && (
            <div className="mt-5">
              <PaymentSectoin branchId={selectedBranchId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
