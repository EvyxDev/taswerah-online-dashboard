"use client";

import {
  FolderOpen,
  CreditCard,
  Image as ImageIcon,
  BarChart3,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
}: StatCardProps) => {
  return (
    <div className="bg-white flex flex-col justify-between shadow-sm shadow-black/10 border border-gray-200 p-4 2xl:p-6 rounded-2xl h-40 sm:h-44 md:h-48 lg:h-40 2xl:h-48 hover:shadow-xl transition-shadow duration-300">
      <div className="2xl:mb-2">
        <Icon className={`w-10 sm:w-12 lg:w-10 2xl:w-14 h-auto ${iconColor}`} />
      </div>
      <div className="flex flex-col justify-between h-full">
        <h6 className="text-main-black font-homenaje text-xl lg:text-xl 2xl:text-2xl">
          {title}
        </h6>
        <div>
          <p className="text-main-black font-homenaje text-2xl sm:text-3xl md:text-base 2xl:text-4xl mb-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 font-homenaje">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CardSection({
  syncJobsStats,
}: {
  syncJobsStats: homeStates;
}) {
  const t = useTranslations("dashboard");

  // Helper function to safely calculate success rate
  const getSafeSuccessRate = () => {
    const completed = syncJobsStats.status_breakdown.completed;
    const total = syncJobsStats.total_jobs;

    const safeCompleted =
      typeof completed === "number" && !isNaN(completed) ? completed : 0;
    const safeTotal =
      typeof total === "number" && !isNaN(total) && total > 0 ? total : 1;

    const percentage = (safeCompleted / safeTotal) * 100;
    return Math.min(percentage, 100).toFixed(1);
  };

  const successRate = getSafeSuccessRate();

  const cardData = [
    {
      title: t("totalJobs"),
      value: syncJobsStats.total_jobs || 0,
      description: t("allSyncJobs"),
      icon: FolderOpen,
      iconColor: "text-blue-600",
    },
    {
      title: t("totalPayAmount"),
      value: `${(parseFloat(syncJobsStats.total_pay_amount) || 0).toFixed(
        2
      )} L.E`,
      description: t("totalEarnings"),
      icon: CreditCard,
      iconColor: "text-green-600",
    },
    {
      title: t("totalPhotos"),
      value: syncJobsStats.total_photos || 0,
      description: t("allPhotosProcessed"),
      icon: ImageIcon,
      iconColor: "text-purple-600",
    },
    {
      title: t("successRate"),
      value: `${successRate}%`,
      description: t("completedJobs"),
      icon: BarChart3,
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconColor={card.iconColor}
          description={card.description}
        />
      ))}
    </div>
  );
}
