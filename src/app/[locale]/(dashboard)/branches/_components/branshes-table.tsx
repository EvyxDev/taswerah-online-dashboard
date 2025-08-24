"use client";

import { Calendar, Copy, Check } from "lucide-react";
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
import { useState } from "react";

interface Props {
  branshes: Branch[];
}

export default function BranshesTable({ branshes }: Props) {
  const t = useTranslations();
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());

  const copyToClipboard = async (token: string, branchId: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedTokens((prev) => new Set(prev).add(branchId));

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedTokens((prev) => {
          const newSet = new Set(prev);
          newSet.delete(branchId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy token:", err);
    }
  };

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
                  {t("branches.ID")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje text-lg rtl:text-3xl">
                  {t("branches.name")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje text-lg rtl:text-3xl">
                  {t("branches.token")}
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
                      <p className="font-medium font-homenaje text-lg ">
                        {branch.id}
                      </p>
                    </TableCell>
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
                    <TableCell>
                      {branch.token ? (
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-homenaje text-lg ">
                            {branch.token}
                          </p>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                branch.token,
                                branch.id.toString()
                              )
                            }
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Copy token"
                          >
                            {copiedTokens.has(branch.id.toString()) ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <p className="font-medium font-homenaje text-lg "> </p>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
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
