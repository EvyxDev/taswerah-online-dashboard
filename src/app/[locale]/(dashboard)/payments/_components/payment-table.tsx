/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { allEmployees, dateOptions } from "@/lib/constants/data.constant";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const ITEMS_PER_PAGE = 7;

export default function PaymentTable({ employees }: { employees: Employee[] }) {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2025-02-20");
  const router = useRouter();

  // Filter employees based on selected date
  const filteredEmployees = useMemo(() => {
    if (selectedDate === "all") {
      return allEmployees;
    }

    if (selectedDate === "week") {
      const weekStart = "2025-02-14";
      const weekEnd = "2025-02-20";
      return allEmployees.filter(
        (employee) =>
          employee.lastActivity >= weekStart && employee.lastActivity <= weekEnd
      );
    }

    return allEmployees.filter(
      (employee) => employee.lastActivity === selectedDate
    );
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const getSelectedDateLabel = () => {
    const option = dateOptions.find((opt) => opt.value === selectedDate);
    return option ? option.label : "20-02-2025";
  };

  return (
    <Card className="max-w-screen-2xl mx-auto bg-background rounded-2xl py-6 pb-12 ">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje rtl:font-almarai  text-foreground">
              {t("navigation.employees")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje rtl:font-almarai t text-white hover:bg-[#535862]"
            >
              {filteredEmployees.length}
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

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className=" px-7">
                <TableHead className="font-medium text-start font-homenaje rtl:font-almarai text-lg  text-gray-400 text-muted-foreground lg:w-[60%] xl:w-[77%]">
                  {t("dashboard.name")}
                </TableHead>
                <TableHead className="font-medium font-homenaje rtl:font-almarai text-lg  text-gray-400 text-muted-foreground text-center ">
                  {t("dashboard.noCustomers")}
                </TableHead>
                <TableHead className="font-medium font-homenaje rtl:font-almarai text-lg  text-gray-400 text-muted-foreground text-center">
                  {t("dashboard.noPhotos")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <TableRow
                    key={employee.id}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    } cursor-pointer hover:bg-gray-200`}
                    onClick={() =>
                      router.push(`/payments/clients/${employee.id}`)
                    }
                  >
                    <TableCell>
                      <div className="flex items-center gap-3 ">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={employee.name || "/placeholder.svg"}
                            alt={employee.name}
                          />
                          <AvatarFallback className="text-sm font-medium">
                            {employee.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium font-homenaje rtl:font-almarai text-lg  ">
                            {employee.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg   font-medium text-muted-foreground ml-12">
                      {employee?.stats?.total_customers || 0}
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg   font-medium text-muted-foreground">
                      {employee?.stats?.total_photos || 0}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{t("dashboard.noEmployeesFound")}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDateChange("all")}
                        className="text-xs"
                      >
                        {t("dashboard.viewAllEmployees")}
                      </Button>
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
