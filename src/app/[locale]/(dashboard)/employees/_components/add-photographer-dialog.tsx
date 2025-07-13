"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { currentBranches } from "@/lib/constants/data.constant";
import { useTranslations } from "next-intl";
import { FaPlus } from "react-icons/fa6";

export default function AddPhotographerDialog() {
  const t = useTranslations("photographers");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-homenaje text-lg main-button !w-[50px] !px-0 !py-0"
        >
          <FaPlus className="!text-6xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl ">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje font-normal mb-2">
            {t("addPhotographer")}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-7">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Input
                id="name"
                name="name"
                placeholder={t("name")}
                type="text"
                required
              />
            </div>
            <div className="flex-1">
              <Select name="branch" required>
                <SelectTrigger id="branch">
                  <SelectValue placeholder={t("selectBranch")} />
                </SelectTrigger>
                <SelectContent>
                  {currentBranches.map((branch) => (
                    <SelectItem key={branch.name} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="r">
            <div className="flex justify-center w-full mt-5 items-cente">
              <Button
                className="main-button !py-7"
                type="submit"
                variant="default"
              >
                {t("save")}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
