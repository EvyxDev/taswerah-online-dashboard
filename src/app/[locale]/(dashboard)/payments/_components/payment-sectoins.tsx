import CardSection from "../../_components/card-sectoin";
import ChartsSectoin from "../../_components/charts-sectoin";
import { usePaymentsByBransh } from "../_hooks/use-payment";
import PaymentTable from "./payment-table";

export default function PaymentSectoin({ branchId }: { branchId: string }) {
  const { data: states } = usePaymentsByBransh(branchId);
  if (!states) {
    return;
  }
  console.log(states);
  return (
    <div className="space-y-8 py-8">
      <CardSection summary={states} />
      <ChartsSectoin
        SalesChart={states?.sales_chart}
        photoStats={states?.photo_stats}
      />
      {states.employees && <PaymentTable employees={states.employees} />}
    </div>
  );
}
