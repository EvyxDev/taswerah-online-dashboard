"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePaymentsSyncFilter from "../_hooks/use-sync-filter";
import { Download } from "lucide-react";
// import { useEmployees } from "../../_hooks/use-employees";
import { useQueryClient } from "@tanstack/react-query";
import { exportSyncJobsToExcel } from "@/lib/utils/export-excel";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  branches?: Branch[];
  employees?: BranchEmployee[];
  selectedBranchId?: string;
};

export default function PaymentFilterDialog({
  branches = [],
  employees = [],
  selectedBranchId: selectedBranchFromProps,
}: Props) {
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("all");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    selectedBranchFromProps || "all"
  );
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { syncFilterData, isLoading, error, refetch } = usePaymentsSyncFilter({
    employee_id:
      selectedEmployeeId && selectedEmployeeId !== "all"
        ? selectedEmployeeId
        : undefined,
    employeeName: employeeName || undefined,
    from: fromDate || undefined,
    to: toDate || undefined,
    branch_id:
      selectedBranchId && selectedBranchId !== "all"
        ? selectedBranchId
        : undefined,
  });

  const onSubmit = async () => {
    setSubmitted(true);
    await refetch();
  };

  const resetState = () => {
    setFromDate("");
    setToDate("");
    setSelectedEmployeeId("all");
    setEmployeeName("");
    setSelectedBranchId("all");
    setSubmitted(false);
    queryClient.removeQueries({ queryKey: ["payments-sync-filter"] });
  };

  const staffList: BranchEmployee[] = (employees || []).filter(
    (e) => e.employee_id !== null
  );

  const handleBranchChange = (branchId: string) => {
    setSelectedBranchId(branchId);
    setSelectedEmployeeId("all");
    const params = new URLSearchParams(searchParams.toString());
    if (branchId === "all") {
      params.delete("branch_id");
    } else {
      params.set("branch_id", branchId);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetState();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-homenaje rtl:font-almarai text-sm"
        >
          Export as Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-homenaje rtl:font-almarai font-normal">
            Sync Data Filter
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="font-homenaje rtl:font-almarai text-sm">
              From Date (YYYY-MM-DD)
            </Label>
            <Input
              placeholder="2025-01-01"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-homenaje rtl:font-almarai text-sm">
              To Date (YYYY-MM-DD)
            </Label>
            <Input
              placeholder="2025-01-31"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              type="date"
            />
          </div>
          {branches?.length ? (
            <div className="flex flex-col gap-2">
              <Label className="font-homenaje rtl:font-almarai text-sm">
                Branch
              </Label>
              <Select
                value={selectedBranchId}
                onValueChange={handleBranchChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All branches</SelectItem>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <Label className="font-homenaje rtl:font-almarai text-sm">
              Employee
            </Label>
            <Select
              value={selectedEmployeeId}
              onValueChange={setSelectedEmployeeId}
              disabled={selectedBranchId === "all" || staffList.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    selectedBranchId === "all"
                      ? "Select branch first"
                      : "Select employee"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All employees</SelectItem>
                {staffList.map((emp) => (
                  <SelectItem
                    key={String(emp.employee_id)}
                    value={String(emp.employee_id)}
                  >
                    {emp.employeeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-homenaje rtl:font-almarai text-sm">
            Employee Name (Search)
          </Label>
          <Input
            placeholder="Enter employee name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={resetState}>
            Clear
          </Button>
          <Button onClick={onSubmit} disabled={isLoading} variant={"outline"}>
            {isLoading ? "Loading..." : "Export All Data"}
          </Button>
        </div>

        {submitted && error && (
          <div className="text-red-500 text-center mt-4">
            Failed to load sync filter data
          </div>
        )}

        {submitted && syncFilterData && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-homenaje rtl:font-almarai text-lg font-medium">
                  Sync Jobs Results
                </h3>
                <Button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                  onClick={() => exportSyncJobsToExcel(syncFilterData)}
                >
                  <Download className="h-4 w-4" />
                  Export as Excel
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Jobs:</span>
                  <span className="ml-2 font-medium">
                    {syncFilterData.sync_jobs.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Total Photos:</span>
                  <span className="ml-2 font-medium">
                    {syncFilterData.statistics.total_photos}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Total Money:</span>
                  <span className="ml-2 font-medium">
                    ${syncFilterData.statistics.total_money}
                  </span>
                </div>
              </div>
            </div>

            {syncFilterData.sync_jobs &&
              syncFilterData.sync_jobs.length > 0 && (
                <div className="max-h-80 overflow-y-auto">
                  <div className="space-y-2">
                    {syncFilterData.sync_jobs.map((job, index) => (
                      <div
                        key={(job as { id?: number | string }).id ?? index}
                        className="border rounded-lg p-3 bg-white"
                      >
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Employee:</span>
                            <span className="ml-2 font-medium">
                              {job.employeeName}{" "}
                              {job.employee_id
                                ? `(ID: ${job.employee_id})`
                                : ""}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <span className="ml-2 font-medium">
                              {job.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Order Code:</span>
                            <span className="ml-2 font-medium">
                              {job.orderprefixcode}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <span className="ml-2 font-medium">
                              ${job.pay_amount}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Photos:</span>
                            <span className="ml-2 font-medium">
                              {job.number_of_photos}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2 font-medium">
                              {job.orderphone}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Created:</span>
                            <span className="ml-2 font-medium">
                              {new Date(job.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Updated:</span>
                            <span className="ml-2 font-medium">
                              {new Date(job.updated_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {(!syncFilterData.sync_jobs ||
              syncFilterData.sync_jobs.length === 0) && (
              <div className="text-center text-gray-500 py-8">
                No sync jobs found for the selected filters
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
