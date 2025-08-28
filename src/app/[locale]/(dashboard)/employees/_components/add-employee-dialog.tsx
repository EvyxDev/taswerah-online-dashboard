"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import AddoREditEmployeeForm from "./add-employee-form";

export default function AddOrEditEmployeeDialog({
  edit = false,
  trigger,
  employee,
}: {
  edit?: boolean;
  trigger?: React.ReactNode;
  employee?: Employee;
}) {
  const t = useTranslations("employees");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="default"
            className="font-homenaje rtl:font-almarai text-lg main-button !w-[50px] !px-0 !py-0"
          >
            <FaPlus className="!text-5xl" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje rtl:font-almarai font-normal mb-2">
            {edit ? t("editEmployee") : t("addEmployee")}
          </DialogTitle>
        </DialogHeader>
        <AddoREditEmployeeForm
          employee={employee}
          edit={edit}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
