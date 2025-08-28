/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTranslations } from "next-intl";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusBreakdownChartProps {
  statusData: {
    labels: string[];
    data: number[];
  };
}

export function StatusBreakdownChart({
  statusData,
}: StatusBreakdownChartProps) {
  const t = useTranslations("dashboard");

  const chartData = {
    labels: statusData.labels,

    datasets: [
      {
        data: statusData.data,
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Card className="h-full rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-normal font-homenaje rtl:font-almarai text-gray-800">
          {t("jobStatusBreakdown")}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Doughnut data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
