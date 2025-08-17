import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Receipt from "./taswera-receipt";
import { TableCell } from "@/components/ui/table";

export function ReceiptDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableCell
        className="text-center font-homenaje text-lg rtl:text-3xl font-medium text-muted-foreground cursor-pointer underline"
        onClick={() => setIsOpen(true)}
      >
        View Receipt
      </TableCell>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-fit max-h-[80vh] overflow-y-auto rounded-none">
          <Receipt />
        </DialogContent>
      </Dialog>
    </>
  );
}
