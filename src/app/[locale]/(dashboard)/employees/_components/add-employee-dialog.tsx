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
import AddEmployeeForm from "./add-employee-form";

export default function AddEmployeeDialog() {
  const t = useTranslations("employees");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-homenaje text-lg main-button !w-[50px] !px-0 !py-0"
        >
          <FaPlus className="!text-5xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje font-normal mb-2">
            {t("addEmployee")}
          </DialogTitle>
        </DialogHeader>
        <AddEmployeeForm />
      </DialogContent>
    </Dialog>
  );
}
