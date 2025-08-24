import { StatusBreakdownChart } from "./status-breakdown-chart";
import { StatusOverview } from "./status-overview";

export default function ChartsSectoin({
  syncJobsStats,
}: {
  syncJobsStats: homeStates;
}) {
  if (!syncJobsStats) {
    return null;
  }

  // Create status breakdown data for the chart
  const statusData = {
    labels: ["Completed", "Failed", "Pending", "Synced"],
    data: [
      syncJobsStats.status_breakdown.completed,
      syncJobsStats.status_breakdown.failed,
      syncJobsStats.status_breakdown.pending,
      syncJobsStats.status_breakdown.synced,
    ],
  };

  return (
    <div className="flex items-start min-[1100px]:flex-row flex-col justify-between gap-4 flex-wrap">
      <div className="w-full min-[1100px]:w-[60%]">
        <StatusBreakdownChart statusData={statusData} />
      </div>
      <div className="w-full min-[1100px]:w-[38%]">
        <StatusOverview
          statusBreakdown={syncJobsStats.status_breakdown}
          totalJobs={syncJobsStats.total_jobs}
        />
      </div>
    </div>
  );
}
