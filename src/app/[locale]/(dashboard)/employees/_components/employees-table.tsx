/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { FaPen } from "react-icons/fa";
import { HiMiniTrash } from "react-icons/hi2";

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
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import AddOrEditEmployeeDialog from "./add-employee-dialog";
import { DeleteDialog } from "@/components/common/delete -dialog";
import useDeleteEmployeer from "../_hooks/use-delete-employeer";
import { PaginationComponent } from "@/components/common/pagination-comp";
const ITEMS_PER_PAGE = 7;

interface Props {
  employees: PaginatedEmployees;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number; 
}

export default function EmployeesTable({
  employees,
  onPageChange,
  currentPage,
  totalPages,
}: Props) {
  // Translation
  const t = useTranslations("employees");
  const tNav = useTranslations("navigation");

  // Hooks
  const { DeleteEmployeer } = useDeleteEmployeer();

  // Variables
  const employeesData = employees.data;

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl py-6 h-full ">
      <div className="w-full  h-fit">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje  text-foreground">
              {tNav("employees")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje t text-white hover:bg-[#535862]"
            >
              {employeesData?.length || 0}
            </Badge>
          </div>
          <AddOrEditEmployeeDialog />
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className=" px-7">
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-start w-[100px] ">
                  {t("status")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-start w-[130px] ">
                  {t("name")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[130px]">
                  {t("email")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[200px]">
                  {t("phoneNumber")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[130px]">
                  {t("branch")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[100px]">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {employeesData.length > 0 ? (
                employeesData.map((employee, index) => (
                  <TableRow
                    key={employee.name}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <Switch checked={employee.status === "active"} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 ">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={employee.name.charAt(2) || "/placeholder.svg"}
                            alt={employee.name}
                          />
                          <AvatarFallback className="text-sm font-medium uppercase ">
                            {employee.name.charAt(0) + employee.name.charAt(1)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium font-homenaje text-lg">
                            {employee.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground">
                      {employee.email}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee.phone}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee?.branch?.name || t("unknown")}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-7">
                        <DeleteDialog
                          action={() =>
                            DeleteEmployeer({ id: String(employee.id) })
                          }
                          description="Are you sure you want to delete this employee? This action cannot be undone."
                          title="Delete Employee"
                        >
                          <button className="">
                            <HiMiniTrash className="text-black text-2xl" />
                          </button>
                        </DeleteDialog>
                        <AddOrEditEmployeeDialog
                          edit={true}
                          employee={employee}
                          trigger={
                            <button className=" text-black">
                              <FaPen />
                            </button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{t("noEmployeesFound")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination - Only show if there are results */}
        {employeesData.length > 0 && (
          <>
            <div className="mt-6">
              <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} maxVisiblePages={5} />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
