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
import { employeesData } from "@/lib/constants/data.constant";
import { useTranslations } from "next-intl";
import AddEmployeeDialog from "./add-employee-dialog";
import { Switch } from "@/components/ui/switch";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const ITEMS_PER_PAGE = 7;

export default function EmployeesTable() {
  const t = useTranslations("employees");
  const tNav = useTranslations("navigation");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(employeesData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEmployees = employeesData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
              {employeesData.length}
            </Badge>
          </div>
          <AddEmployeeDialog />
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
                <TableHead className="font-medium font-homenaje text-lg text-gray-400 text-muted-foreground text-center w-[130px]">
                  {t("password")}
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
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, index) => (
                  <TableRow
                    key={employee.name}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <Switch checked={employee.status} />
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
                      {/* Password cell with eye icon */}
                      <PasswordCell password={employee.password} />
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {employee.branch}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-7">
                        <button className="">
                          <HiMiniTrash className="text-black text-2xl" />
                        </button>
                        <button className=" text-black">
                          <FaPen />
                        </button>
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
            <div className="flex items-center justify-between mt-6  px-7">
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-homenaje text-xl shadow-sm border disabled:bg-[#FAFAFA]"
                onClick={goToPrevious}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-8 w-8" />
                {tNav("previous")}
              </Button>

              <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        className={`w-8 h-8 p-0 ${
                          currentPage === page
                            ? "bg-slate-200 text-black hover:bg-slate-200"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => goToPage(page as number)}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-2 font-homenaje text-xl shadow-sm border"
                onClick={goToNext}
                disabled={currentPage === totalPages}
              >
                {tNav("next")}
                <ArrowRight className="h-8 w-8" />
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function PasswordCell({ password }: { password: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex items-center justify-center select-text">
      <span className="mx-auto min-w-[40px] text-center">
        {show ? password : "*".repeat(password.length)}
      </span>
      <button
        type="button"
        className="absolute right-0 rtl:right-auto rtl:left-0 top-1/2 -translate-y-1/2 p-0 bg-transparent border-0 cursor-pointer"
        tabIndex={-1}
        onClick={() => setShow((s) => !s)}
      >
        {show ? (
          <VscEye size={18} className="text-gray-500" />
        ) : (
          <VscEyeClosed size={18} className="text-gray-500" />
        )}
        <span className="sr-only">
          {show ? "Hide password" : "Show password"}
        </span>
      </button>
    </span>
  );
}
