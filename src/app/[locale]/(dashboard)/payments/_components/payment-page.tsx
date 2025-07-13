"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CardSection from "../../_components/card-sectoin";
import ChartsSectoin from "../../_components/charts-sectoin";
import PaymentTable from "./payment-table";
import { useTranslations } from "next-intl";

export default function PaymentPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("nasrcity");

  const tabs = [
    { value: "nasrcity", label: t("payments.nasrCity") },
    { value: "zamalek", label: t("payments.zamalek") },
    { value: "mohandseen", label: t("payments.mohandseen") },
    { value: "dokki", label: t("payments.dokki") },
    { value: "agouza", label: t("payments.agouza") },
  ];

  const renderContent = () => (
    <div className="space-y-8 py-8">
      <CardSection />
      <ChartsSectoin />
      <PaymentTable />
    </div>
  );

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
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-5">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
