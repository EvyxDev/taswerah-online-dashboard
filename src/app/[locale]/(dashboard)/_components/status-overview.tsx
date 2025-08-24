"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatusOverviewProps {
  statusBreakdown: homeStates["status_breakdown"];
  totalJobs: number;
}

export function StatusOverview({
  statusBreakdown,
  totalJobs,
}: StatusOverviewProps) {
  const t = useTranslations("dashboard");

  const statusConfig = [
    {
      key: "completed",
      label: t("completedJobs"),
      color: "bg-green-500",
      textColor: "text-green-600",
      icon: CheckCircle,
    },
    {
      key: "synced",
      label: t("synced"),
      color: "bg-blue-500",
      textColor: "text-blue-600",
      icon: RefreshCw,
    },
    {
      key: "pending",
      label: t("pending"),
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      icon: Clock,
    },
    {
      key: "failed",
      label: t("failed"),
      color: "bg-red-500",
      textColor: "text-red-600",
      icon: XCircle,
    },
  ];

  // Helper function to safely get count and calculate percentage
  const getSafeCountAndPercentage = (key: string) => {
    const count = statusBreakdown[key as keyof typeof statusBreakdown];
    const safeCount = typeof count === "number" && !isNaN(count) ? count : 0;
    const safeTotalJobs =
      typeof totalJobs === "number" && !isNaN(totalJobs) && totalJobs > 0
        ? totalJobs
        : 1;
    const percentage = (safeCount / safeTotalJobs) * 100;
    return { count: safeCount, percentage: Math.min(percentage, 100) };
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {t("jobStatusOverview")}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <div className="h-full flex flex-col justify-between">
          {statusConfig.map((status) => {
            const { count, percentage } = getSafeCountAndPercentage(status.key);
            const IconComponent = status.icon;

            return (
              <div
                key={status.key}
                className="flex-1 flex flex-col justify-center space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${status.textColor}`} />
                    <span className="font-medium text-gray-700 text-sm">
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-sm ${status.textColor}`}
                    >
                      {count}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${status.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
