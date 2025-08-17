import { ChartAreaGradient } from "../../_components/chart-area-gradient";
import { PhotoSalesChart } from "../../_components/sales-chart";

export default function PaymentChartsSectoin({
  data,
}: {
  data: PaymentsDashboardData;
}) {
  if (!data) return null;

  const salesChart: SalesChart = {
    labels: (data.monthly_payments || []).map((m) => m.month),
    data: (data.monthly_payments || []).map((m) => {
      const v =
        typeof m.value === "string" ? parseFloat(m.value) : m.value || 0;
      return isNaN(v) ? 0 : v;
    }),
  };

  const sold = data.selected_photo_stats?.sold || 0;
  const total = data.selected_photo_stats?.total || 0;
  const sold_percentage = total > 0 ? Math.round((sold / total) * 100) : 0;
  const captured_count = Math.max(0, total - sold);

  const photoStats: PhotoStats = {
    sold_percentage,
    sold_count: sold,
    captured_count,
  };

  return (
    <div className="flex items-start min-[1100px]:flex-row flex-col justify-between gap-2 flex-wrap">
      <div className=" w-full min-[1100px]:w-[60%]">
        <ChartAreaGradient SalesChart={salesChart} />
      </div>
      <div className="w-full min-[1100px]:w-[38%]">
        <PhotoSalesChart photoStats={photoStats} />
      </div>
    </div>
  );
}
