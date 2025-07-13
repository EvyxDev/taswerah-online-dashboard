import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CardSection from "./card-sectoin";
import ChartsSectoin from "./charts-sectoin";
import { IoMdHome } from "react-icons/io";
import DashTable from "./dash-table";
import { useTranslations } from "next-intl";

export default function DashBoard() {
  const t = useTranslations();
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
        <CardSection />
        <ChartsSectoin />
        <DashTable />
      </div>
    </div>
  );
}
