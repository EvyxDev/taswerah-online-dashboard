"use client";

import { Calendar } from "lucide-react";
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
import { useTranslations } from "next-intl";
import AddOrEditBranchDialog from "./add-branch-dialog";
import Image from "next/image";

interface Props {
  branshes: Branch[];
}

export default function BranshesTable({ branshes }: Props) {
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
              {branshes.length}
            </Badge>
          </div>
          <AddOrEditBranchDialog />
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="text-start text-gray-400 font-homenaje text-lg rtl:text-3xl">
                  {t("branches.name")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branshes.length > 0 ? (
                branshes.map((branch, index) => (
                  <TableRow
                    key={branch.id}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/assets/bransh.png"
                          alt="Branch"
                          width={40}
                          height={40}
                        />
                        <span className="font-medium font-homenaje text-lg ">
                          {branch.name}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={1} className="text-center py-8">
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
