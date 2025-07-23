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
import AddorEditBranshForm from "./add-bransh-form";

export default function AddOrEditBranchDialog({
  edit = false,
  trigger,
  bransh,
}: {
  edit?: boolean;
  trigger?: React.ReactNode;
  bransh?: Branch;
}) {
  const t = useTranslations("branches");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="default"
            className="font-homenaje text-lg main-button !w-[50px] !px-0 !py-0"
          >
            <FaPlus className="!text-5xl" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje font-normal mb-2">
            {edit ? t("editBranch") : t("addBranch")}
          </DialogTitle>
        </DialogHeader>
        <AddorEditBranshForm
          bransh={bransh}
          edit={edit}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
