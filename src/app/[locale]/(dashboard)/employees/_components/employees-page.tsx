"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import EmployeesTable from "./employees-table";
import PhotographersTable from "./photographers-table";
import { useTranslations } from "next-intl";

export default function EmployeesPage() {
  const t = useTranslations("employees");
  const [activeTab, setActiveTab] = useState("employees");
  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "en";

  const tabs = [
    { value: "employees", label: t("employeesTab") },
    { value: "photographers", label: t("photographersTab") },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "employees":
        return <EmployeesTable />;
      case "photographers":
        return <PhotographersTable />;
      default:
        return <EmployeesTable />;
    }
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
        <div className="w-full">
          {/* Custom Tab Navigation */}
          <div className="bg-transparent gap-5 flex">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-3xl font-homenaje py-4 px-8 rounded-2xl transition-colors ${
                  activeTab === tab.value
                    ? "bg-black text-white"
                    : "bg-[#FAFAFA] text-black hover:bg-gray-200"
                }`}
                style={{
                  direction: locale === "ar" ? "rtl" : "ltr",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
