"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BranchLastSync } from "@/lib/api/branches.api";

export default function BranchesLastSyncTable({
  rows,
}: {
  rows: BranchLastSync[];
}) {
  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl py-6 ">
      <div className="mb-6 px-7">
        <h2 className="text-2xl font-homenaje rtl:font-almarai text-foreground">
          Branches - Last Sync
        </h2>
      </div>
      <div className="border">
        <Table className="px-5">
          <TableHeader>
            <TableRow className="px-7">
              <TableHead className="text-start font-homenaje rtl:font-almarai text-lg text-gray-400 lg:w-[50%]">
                Branch
              </TableHead>
              <TableHead className="text-start font-homenaje rtl:font-almarai text-lg text-gray-400 lg:w-[50%]">
                Last Sync Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={row.branch_id}
                  className={`px-7 h-[60px] ${
                    index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                  }`}
                >
                  <TableCell className="font-homenaje rtl:font-almarai text-lg">
                    {row.branch_name}
                  </TableCell>
                  <TableCell className="font-homenaje rtl:font-almarai text-lg text-muted-foreground">
                    {row.last_sync_time
                      ? new Date(row.last_sync_time).toLocaleString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
