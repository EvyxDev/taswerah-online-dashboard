"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useTranslations } from "next-intl";

// Props
type PhotoStats = {
  sold_percentage: number;
  sold_count: number;
  captured_count: number;
};

const chartConfig = {
  sold: {
    label: "Sold",
    color: "#6BA3D6",
  },
  captured: {
    label: "Captured",
    color: "#D1D5DB",
  },
} satisfies ChartConfig;

export function PhotoSalesChart({ photoStats }: { photoStats: PhotoStats }) {
  const t = useTranslations();

  const chartData = [
    {
      name: "Sold",
      value: photoStats.sold_count,
      fill: chartConfig.sold.color,
    },
    { name: "Gap1", value: 3, fill: "transparent" },
    {
      name: "Captured",
      value: photoStats.captured_count,
      fill: chartConfig.captured.color,
    },
    { name: "Gap2", value: 3, fill: "transparent" },
  ];

  return (
    <Card className="w-full min-w-xs mx-auto p-0 rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-medium">
          {t("dashboard.date")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center -mt-16 pb-4">
        <div className="relative">
          <ChartContainer config={chartConfig} className="h-80 w-80">
            <PieChart width={260} height={260}>
              <Pie
                data={chartData}
                cx={160}
                cy={160}
                innerRadius={90}
                outerRadius={115}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
                strokeWidth={0}
                cornerRadius={7}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">
              {photoStats.sold_percentage}%
            </div>
            <div className="text-lg text-gray-600 mt-1">
              {t("dashboard.soldPhotos")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 -mt-7">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#6BA3D6]" />
            <span className="text-sm font-medium font-homenaje text-gray-700">
              {t("dashboard.sold")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#D1D5DB]" />
            <span className="text-sm font-medium font-homenaje text-gray-700">
              {t("dashboard.captured")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="sr-only" />
    </Card>
  );
}
