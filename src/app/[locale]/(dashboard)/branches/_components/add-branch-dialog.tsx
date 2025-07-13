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
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaPlus } from "react-icons/fa6";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const employeeOptions = Array.from({ length: 21 }, (_, i) => i); // 0-20
const photographerOptions = Array.from({ length: 21 }, (_, i) => i); // 0-20

export default function AddBranchDialog() {
  const t = useTranslations("branches");
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
      <DialogContent className="!max-w-2xl ">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje font-normal mb-2">
            {t("addBranch")}
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
              <Select name="employees" required>
                <SelectTrigger id="employees">
                  <SelectValue placeholder={t("noEmployees")} />
                </SelectTrigger>
                <SelectContent>
                  {employeeOptions.map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Select name="photographers" required>
                <SelectTrigger id="photographers">
                  <SelectValue placeholder={t("noPhotographers")} />
                </SelectTrigger>
                <SelectContent>
                  {photographerOptions.map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input
                id="location"
                name="location"
                placeholder={t("location")}
                type="text"
                required
              />
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
