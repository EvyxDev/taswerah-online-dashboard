"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState, parseAsString } from "nuqs";

interface BranchSelectorProps {
  activeBranches: Branch[];
  selectedBranchId: string;
}

export default function BranchSelector({
  activeBranches,
  selectedBranchId,
}: BranchSelectorProps) {
  const [branchId, setBranchId] = useQueryState(
    "branchId",
    parseAsString.withDefault(selectedBranchId)
  );

  return (
    <Select value={branchId || selectedBranchId} onValueChange={setBranchId}>
      <SelectTrigger className="w-80 text-2xl font-homenaje rtl:font-almarai py-6 px-6 rounded-2xl bg-[#FAFAFA] border-2 border-gray-200 hover:bg-gray-100 focus:bg-white">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent className="rounded-xl max-h-[300px]">
        {activeBranches.map((branch) => (
          <SelectItem
            key={branch.id}
            value={branch.id.toString()}
            className="text-lg  font-homenaje rtl:font-almarai py-3 px-4 cursor-pointer hover:bg-gray-100"
          >
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
