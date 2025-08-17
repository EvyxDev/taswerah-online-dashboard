import { Skeleton } from "@/components/ui/skeleton";

export function PaymentCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md border-black border-[12px] p-4 2xl:p-6 rounded-3xl h-40 sm:h-44 md:h-48 lg:h-40 2xl:h-48"
        >
          <Skeleton className="h-10 w-10 mb-4" />
          <div className="flex items-center justify-between w-full">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaymentChartsSkeleton() {
  return (
    <div className="flex items-start min-[1100px]:flex-row flex-col justify-between gap-2 flex-wrap">
      <div className=" w-full min-[1100px]:w-[60%]">
        <div className="bg-white rounded-3xl p-6">
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
      <div className="w-full min-[1100px]:w-[38%]">
        <div className="bg-white rounded-3xl p-6">
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    </div>
  );
}

export function PaymentStaffTableSkeleton() {
  return (
    <div className="max-w-screen-2xl mx-auto bg-background rounded-2xl py-6 pb-12 ">
      <div className="flex items-center justify-between mb-8 px-7">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-10" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="border">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className={`px-7 h-[70px] ${
              idx % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
            } flex items-center justify-between`}
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
