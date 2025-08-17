import PaymentCardSection from "./payment-card-section";
import PaymentChartsSectoin from "./payment-charts-sectoin";
import { usePaymentsDashboard } from "../_hooks/use-payments-dashboard";
import PaymentStaffTable from "./payment-staff-table";
import {
  PaymentCardsSkeleton,
  PaymentChartsSkeleton,
  PaymentStaffTableSkeleton,
} from "./payment-skeletons";

export default function PaymentSectoin({ branchId }: { branchId: string }) {
  const { data, isLoading } = usePaymentsDashboard(branchId);
  if (!data && isLoading) {
    return (
      <div className="space-y-8 py-8">
        <PaymentCardsSkeleton />
        <PaymentChartsSkeleton />
        <PaymentStaffTableSkeleton />
      </div>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <div className="space-y-8 py-8">
      <PaymentCardSection data={data} />
      <PaymentChartsSectoin data={data} />
      <PaymentStaffTable staff={data.staff || []} />
    </div>
  );
}
