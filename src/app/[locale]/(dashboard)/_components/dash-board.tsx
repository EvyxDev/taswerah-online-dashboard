"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { IoMdHome } from "react-icons/io";
import { useTranslations } from "next-intl";
import CardSection from "./card-sectoin";
import ChartsSectoin from "./charts-sectoin";
import DashTable from "./dash-table";

export default function DashBoard({ homeStates }: { homeStates: homeStates }) {
  const t = useTranslations();

  // // Just call the function every 10 minutes
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       await RefreshDashboardData();
  //     } catch {
  //       console.log("Failed to refresh dashboard data");
  //     }
  //   }, 1000); // 10 minutes

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className=" space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje text-sm text-gray-400">
              <IoMdHome size={28} color="black" className="-mt-2" />
              {t("navigation.dashboard")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-10 space-y-8">
        <CardSection syncJobsStats={homeStates} />
        <ChartsSectoin syncJobsStats={homeStates} />
        <DashTable syncJobs={homeStates.jobs} />
      </div>
    </div>
  );
}
