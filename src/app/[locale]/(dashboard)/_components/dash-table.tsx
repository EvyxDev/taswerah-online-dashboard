"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function DashTable({
  StaffPerformanceEntry,
}: {
  StaffPerformanceEntry: StaffPerformanceEntry[];
}) {
  const t = useTranslations();

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl py-6 ">
      <div className="mb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje text-foreground">
              {t("navigation.employees")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje text-white hover:bg-[#535862]"
            >
              {StaffPerformanceEntry.length}
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="text-lg font-homenaje text-gray-400 text-start lg:w-[60%] xl:w-[77%]">
                  {t("dashboard.name")}
                </TableHead>
                <TableHead className="text-center font-homenaje text-lg text-gray-400">
                  {t("dashboard.noCustomers")}
                </TableHead>
                <TableHead className="text-center font-homenaje text-lg text-gray-400">
                  {t("dashboard.noPhotos")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {StaffPerformanceEntry.length > 0 ? (
                StaffPerformanceEntry.map((employee, index) => (
                  <TableRow
                    key={employee.name}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={employee.name || "/placeholder.svg"}
                            alt={employee.name}
                          />
                          <AvatarFallback>
                            {employee.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium font-homenaje text-lg">
                            {employee.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee.customers}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground">
                      {employee.photos}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <p className="text-muted-foreground">
                      {t("dashboard.noEmployeesFound")}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
