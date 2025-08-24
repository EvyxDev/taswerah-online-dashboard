"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Camera, DollarSign } from "lucide-react";

interface RecentActivityProps {
  recentJobs: homeStates["jobs"];
}

export function RecentActivity({ recentJobs }: RecentActivityProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "synced":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {job.employeeName}
                  </h4>
                  <Badge className={`text-xs ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{job.orderphone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-3 w-3" />
                    <span>{job.number_of_photos} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3" />
                    <span>${job.pay_amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-400">
                  {formatDate(job.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
