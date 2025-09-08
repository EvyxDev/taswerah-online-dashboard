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
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set(prev).add(itemId));

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const truncateText = (text: string, maxLength: number = 20) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl pt-6 pb-20 h-full ">
      <div className="w-full h-fit">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje rtl:font-almarai text-foreground">
              {t("navigation.branches")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje rtl:font-almarai t text-white hover:bg-[#535862]"
            >
              {branshes.length}
            </Badge>
          </div>
          <AddOrEditBranchDialog />
        </div>

        {/* Table */}
        <div className="border overflow-x-auto">
          <Table className="px-5 min-w-full">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap">
                  {t("branches.ID")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap min-w-[200px]">
                  {t("branches.name")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap min-w-[200px]">
                  {t("branches.adminEmail")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap  ">
                  {t("branches.adminPassword")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap ">
                  {t("branches.branchManagerEmail")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap">
                  {t("branches.branchManagerPassword")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg whitespace-nowrap">
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
                    <TableCell className="whitespace-nowrap">
                      <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                        {branch.id}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/assets/bransh.png"
                          alt="Branch"
                          width={40}
                          height={40}
                        />
                        <span className="font-medium font-homenaje rtl:font-almarai text-lg">
                          {branch.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                          {truncateText(branch.admin_email, 25)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              branch.admin_email,
                              `admin-email-${branch.id}`
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy admin email"
                        >
                          {copiedItems.has(`admin-email-${branch.id}`) ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                          {truncateText(branch.admin_password, 20)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              branch.admin_password,
                              `admin-password-${branch.id}`
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy admin password"
                        >
                          {copiedItems.has(`admin-password-${branch.id}`) ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                          {truncateText(branch.manager_email, 25)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              branch.manager_email,
                              `manager-email-${branch.id}`
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy manager email"
                        >
                          {copiedItems.has(`manager-email-${branch.id}`) ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                          {truncateText(branch.manager_password, 20)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              branch.manager_password,
                              `manager-password-${branch.id}`
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy manager password"
                        >
                          {copiedItems.has(`manager-password-${branch.id}`) ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {branch.token ? (
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                            {truncateText(branch.token, 20)}
                          </p>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                branch.token,
                                `token-${branch.id}`
                              )
                            }
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Copy token"
                          >
                            {copiedItems.has(`token-${branch.id}`) ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <p className="font-medium font-homenaje rtl:font-almarai text-lg">
                          -
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
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
