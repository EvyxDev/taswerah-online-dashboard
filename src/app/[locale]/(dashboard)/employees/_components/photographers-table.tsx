"use client";

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
import AddOrEditPhotographerDialog from "./add-photographer-dialog";
import { Switch } from "@/components/ui/switch";
import { DeleteDialog } from "@/components/common/delete -dialog";
import useDeleteEmployeer from "../_hooks/use-delete-employeer";
const ITEMS_PER_PAGE = 7;

interface Props {
  PhotoGraphers: PaginatedPhGraphers;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function PhotographersTable({
  PhotoGraphers,
  onPageChange,
  currentPage,
}: Props) {
  // Translation
  const t = useTranslations("employees");
  const tNav = useTranslations("navigation");

  // Hooks
  const { DeleteEmployeer } = useDeleteEmployeer();

  // Variables
  const photoGraphersData = PhotoGraphers?.data;
  const totalPages = Math.ceil(photoGraphersData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPhGraphers = photoGraphersData.slice(startIndex, endIndex);

  // Update the goToPage function
  const goToPage = (page: number) => {
    onPageChange(page);
  };

  // Update the goToPrevious function
  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Update the goToNext function
  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
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
              {t("photographersTab")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje t text-white hover:bg-[#535862]"
            >
              {photoGraphersData?.length || 0}
            </Badge>
          </div>
          <AddOrEditPhotographerDialog />
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className=" px-7">
                <TableHead className="font-medium font-homenaje text-black text-lg  text-muted-foreground text-start  w-[150px]">
                  {t("status")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-black text-lg  text-muted-foreground text-start  ">
                  {t("name")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-black text-lg  text-muted-foreground text-center w-[250px] ">
                  {t("branch")}
                </TableHead>
                <TableHead className="font-medium font-homenaje text-black text-lg text-muted-foreground text-center w-[100px] "></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {currentPhGraphers?.length > 0 ? (
                currentPhGraphers?.map((photoGrapher, index) => (
                  <TableRow
                    key={index}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <Switch checked={photoGrapher.status === "active"} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 ">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              photoGrapher.name.charAt(2) || "/placeholder.svg"
                            }
                            alt={photoGrapher.name}
                          />
                          <AvatarFallback className="text-sm font-medium uppercase ">
                            {photoGrapher.name.charAt(0) +
                              photoGrapher.name.charAt(1)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium font-homenaje text-lg">
                            {photoGrapher.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {photoGrapher?.branch?.name || t("unknown")}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-7">
                        <DeleteDialog
                          action={() =>
                            DeleteEmployeer({ id: String(photoGrapher.id) })
                          }
                          description="Are you sure you want to delete this Photographers? This action cannot be undone."
                          title="Delete Photographers"
                        >
                          <button className="">
                            <HiMiniTrash className="text-black text-2xl" />
                          </button>
                        </DeleteDialog>
                        <AddOrEditPhotographerDialog
                          edit={true}
                          photoGrapher={photoGrapher}
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
                  <TableCell colSpan={4} className="text-center py-8">
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
        {photoGraphersData?.length > 0 && (
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
