"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dateOptions } from "@/lib/constants/data.constant";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PaymentStaffTable({
  staff,
}: {
  staff: PaymentsDashboardStaff[];
}) {
  const t = useTranslations();
  const [selectedDate, setSelectedDate] = useState("all");

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const getSelectedDateLabel = () => {
    const option = dateOptions.find((opt) => opt.value === selectedDate);
    return option ? option.label : "20-02-2025";
  };

  return (
    <Card className="max-w-screen-2xl mx-auto bg-background rounded-2xl py-6 pb-12 ">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje  text-foreground">
              {t("navigation.employees")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje t text-white hover:bg-[#535862]"
            >
              {staff?.length || 0}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Calendar className="h-4 w-4" />
                {t("dashboard.date")}: {getSelectedDateLabel()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {dateOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleDateChange(option.value)}
                  className={selectedDate === option.value ? "bg-muted" : ""}
                >
                  {option.label}
                  {selectedDate === option.value && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      ✓
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className=" px-7">
                <TableHead className="font-medium text-start font-homenaje text-lg  text-gray-400 text-muted-foreground lg:w-[60%] xl:w-[77%]">
                  {t("dashboard.name")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg  text-gray-400 text-muted-foreground text-center ">
                  Role
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg  text-gray-400 text-muted-foreground text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {(staff || []).length > 0 ? (
                staff.map((member, index) => (
                  <TableRow
                    key={member.id}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <span className="font-medium font-homenaje text-lg rtl:text-3xl">
                        {member.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg rtl:text-3xl font-medium text-muted-foreground ml-12">
                      {member.role}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg rtl:text-3xl font-medium text-muted-foreground">
                      {member.status}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{t("navigation.noEmployeesFound")}</p>
                    </div>
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
