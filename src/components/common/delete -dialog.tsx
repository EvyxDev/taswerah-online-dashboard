/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { toast } from "sonner";

interface DeleteDialogProps {
  title: string;
  description: string;
  action: () => Promise<any> | void;
  children: ReactNode;
  successMessage?: string;
  errorMessage?: string;
}

export function DeleteDialog({
  title,
  description,
  action,
  children,
  successMessage = "Deleted successfully!",
  errorMessage = "Failed to delete. Please try again.",
}: DeleteDialogProps) {
  const handleAction = async () => {
    try {
      await action();
      toast.success(successMessage);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
