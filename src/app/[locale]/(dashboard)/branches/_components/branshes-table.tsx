"use client";

import { Calendar } from "lucide-react";
import { FaPen } from "react-icons/fa";
import { HiMiniTrash } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { currentBranches } from "@/lib/constants/data.constant";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import AddOrEditBranchDialog from "./add-branch-dialog";

export default function BranshesTable() {
  const t = useTranslations();

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl pt-6 pb-20 h-full ">
      <div className="w-full  h-fit">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje  text-foreground">
              {t("navigation.branches")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje t text-white hover:bg-[#535862]"
            >
              {currentBranches.length}
            </Badge>
          </div>
          <AddOrEditBranchDialog />
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="w-[100px] text-start text-gray-400 font-homenaje text-lg">
                  {t("branches.status")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje text-lg">
                  {t("branches.name")}
                </TableHead>
                <TableHead className="text-center w-[120px] text-gray-400 font-homenaje text-lg">
                  {t("branches.noEmployees")}
                </TableHead>
                <TableHead className="text-center w-[160px] text-gray-400 font-homenaje text-lg">
                  {t("branches.noPhotographers")}
                </TableHead>
                <TableHead className="text-center w-[200px] text-gray-400 font-homenaje text-lg">
                  {t("branches.location")}
                </TableHead>
                <TableHead className="text-center w-[150px] text-gray-400 font-homenaje text-lg"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBranches.length > 0 ? (
                currentBranches.map((branch, index) => (
                  <TableRow
                    key={branch.name}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <Switch checked={branch.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/assets/bransh.png"
                          alt="Branch"
                          width={40}
                          height={40}
                        />
                        <span className="font-medium font-homenaje text-lg">
                          {branch.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground">
                      {branch.employees}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground">
                      {branch.photographers}
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground truncate max-w-[150px]">
                      <a
                        href={branch.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" underline text-black font-homenaje"
                      >
                        {branch.location}
                      </a>
                    </TableCell>
                    <TableCell className="text-center font-homenaje text-lg font-medium text-muted-foreground ml-12">
                      {" "}
                      <div className="text-center">
                        <div className="flex justify-center gap-7">
                          <button className="">
                            <HiMiniTrash className="text-black text-2xl" />
                          </button>
                          <button className=" text-black">
                            <FaPen />
                          </button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{t("branches.noBranchesFound")}</p>
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
