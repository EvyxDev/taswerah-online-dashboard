"use client";

import { useState, useMemo } from "react";
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
import { Clients, dateOptions } from "@/lib/constants/data.constant";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ReceiptDialog } from "./receipt-dialog";

export default function ClientTable() {
  const tClients = useTranslations("clients");
  const tDashboard = useTranslations("dashboard");
  const [selectedDate, setSelectedDate] = useState("all");

  // Filter employees based on selected date
  const filteredEmployees = useMemo(() => {
    if (selectedDate === "all") {
      return Clients;
    }

    if (selectedDate === "week") {
      // Filter for last week (Feb 14-20, 2025)
      const weekStart = "2025-02-14";
      const weekEnd = "2025-02-20";
      return Clients.filter(
        (employee) =>
          employee.lastActivity >= weekStart && employee.lastActivity <= weekEnd
      );
    }

    return Clients.filter((employee) => employee.lastActivity === selectedDate);
  }, [selectedDate]);

  // Reset to page 1 when filter changes
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const getSelectedDateLabel = () => {
    const option = dateOptions.find((opt) => opt.value === selectedDate);
    return option ? option.label : "20-02-2025";
  };

  return (
    <Card className="max-w-screen-2xl mx-auto bg-background rounded-2xl pt-6 pb-20  ">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje  text-foreground">
              {tClients("clients")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje t text-white hover:bg-[#535862]"
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
                {tDashboard("date")}: {getSelectedDateLabel()}
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
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-start ">
                  {tClients("code")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[200px]">
                  {tClients("mobileNumber")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[200px]">
                  {tClients("receipt")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {Clients.length > 0 ? (
                Clients.map((employee, index) => (
                  <TableRow
                    key={employee.code}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell className="font-homenaje text-lg font-medium text-muted-foreground ">
                      {employee.code}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee.mobileNumber}
                    </TableCell>
                    <ReceiptDialog />
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{tClients("noClientsFound")}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDateChange("all")}
                        className="text-xs"
                      >
                        {tDashboard("viewClients")}
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
