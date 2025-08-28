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
import { packages } from "@/lib/constants/data.constant";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import AddPackageDialog from "./add-package-dialog";

export default function PackagesTable() {
  const t = useTranslations();

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl pt-6 pb-20 h-full ">
      <div className="w-full  h-fit">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje rtl:font-almarai  text-foreground">
              {t("navigation.packages")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje rtl:font-almarai t text-white hover:bg-[#535862]"
            >
              {packages.length}
            </Badge>
          </div>
          <AddPackageDialog />
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="w-[100px] text-start text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.status")}
                </TableHead>
                <TableHead className="text-start text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.name")}
                </TableHead>
                <TableHead className="text-center w-[130px] text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.noPhotos")}
                </TableHead>
                <TableHead className="text-center w-[130px] text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.price")}
                </TableHead>
                <TableHead className="text-center w-[130px] text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.branch")}
                </TableHead>
                <TableHead className="text-start w-[100px] text-gray-400 font-homenaje rtl:font-almarai text-lg  ">
                  {t("packages.description")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <TableRow
                    key={pkg.name}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={"/assets/package.png"}
                          alt="Package"
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                        <span className="font-medium font-homenaje rtl:font-almarai text-lg ">
                          {pkg.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg  font-medium text-muted-foreground">
                      {pkg.photos}
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg font-medium text-muted-foreground">
                      {pkg.price}
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg  font-medium text-muted-foreground">
                      {pkg.branch}
                    </TableCell>
                    <TableCell className="font-homenaje rtl:font-almarai text-lg  font-medium text-muted-foreground truncate max-w-[200px]">
                      {pkg.description}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p>{t("packages.noPackagesFound")}</p>
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
