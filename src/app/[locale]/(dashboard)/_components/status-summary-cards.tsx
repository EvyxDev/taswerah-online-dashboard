/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  FolderSync,
  TrendingUp,
  DollarSign,
  Camera,
} from "lucide-react";

interface StatusSummaryCardsProps {
  syncJobsStats: homeStates;
}

export function StatusSummaryCards({ syncJobsStats }: StatusSummaryCardsProps) {
  const statusIcons = {
    completed: CheckCircle,
    failed: XCircle,
    pending: Clock,
    synced: FolderSync,
  };

  const statusColors = {
    completed: "text-green-600",
    failed: "text-red-600",
    pending: "text-yellow-600",
    synced: "text-blue-600",
  };

  const statusBgColors = {
    completed: "bg-green-50",
    failed: "bg-red-50",
    pending: "bg-yellow-50",
    synced: "bg-blue-50",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Jobs */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Total Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {syncJobsStats.total_jobs}
          </div>
          <p className="text-xs text-gray-500 mt-1">All sync jobs</p>
        </CardContent>
      </Card>

      {/* Total Pay Amount */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            Total Pay Amount
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            ${parseFloat(syncJobsStats.total_pay_amount).toFixed(2)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Total earnings</p>
        </CardContent>
      </Card>

      {/* Total Photos */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Camera className="h-4 w-4 text-purple-500" />
            Total Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {syncJobsStats.total_photos}
          </div>
          <p className="text-xs text-gray-500 mt-1">All photos processed</p>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Success Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {(
              (syncJobsStats.status_breakdown.completed /
                syncJobsStats.total_jobs) *
              100
            ).toFixed(1)}
            %
          </div>
          <p className="text-xs text-gray-500 mt-1">Completed jobs</p>
        </CardContent>
      </Card>
    </div>
  );
}
