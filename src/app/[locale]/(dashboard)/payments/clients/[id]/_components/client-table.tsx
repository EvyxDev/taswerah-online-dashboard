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
import { ReceiptDialog } from "./receipt-dialog";

export default function ClientTable({ clients }: { clients: Client[] }) {
  const tClients = useTranslations("clients");
  const tDashboard = useTranslations("dashboard");
  const [selectedDate, setSelectedDate] = useState("all");

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
            <h2 className="text-2xl font-homenaje rtl:font-almarai  text-foreground">
              Clients
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje rtl:font-almarai t text-white hover:bg-[#535862]"
            >
              {clients.length}
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
                <TableHead className="font-medium font-homenaje rtl:font-almarai text-lg   text-gray-400 text-muted-foreground text-start ">
                  {tClients("code")}
                </TableHead>
                <TableHead className="font-medium font-homenaje rtl:font-almarai text-lg   text-gray-400 text-muted-foreground text-center w-[200px]">
                  {tClients("mobileNumber")}
                </TableHead>
                <TableHead className="font-medium font-homenaje rtl:font-almarai text-lg   text-gray-400 text-muted-foreground text-center w-[200px]">
                  {tClients("receipt")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {clients?.length > 0 ? (
                clients?.map((employee, index) => (
                  <TableRow
                    key={employee.barcode}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell className="font-homenaje rtl:font-almarai text-lg   font-medium text-muted-foreground ">
                      {employee.barcode}
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg   font-medium text-muted-foreground ml-12">
                      {employee.phone_number}
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
