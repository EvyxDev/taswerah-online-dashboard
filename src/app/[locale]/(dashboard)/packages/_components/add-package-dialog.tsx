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
import { useRef, useState } from "react";

export default function AddPackageDialog() {
  const t = useTranslations("packages");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-homenaje text-lg  main-button !w-[50px] !px-0 !py-0"
        >
          <FaPlus className="text-5xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" !max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-4xl font-homenaje font-normal mb-2">
            {t("addPackage")}
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
              <Input
                id="noPhotos"
                name="noPhotos"
                placeholder={t("noPhotos")}
                type="number"
                min={1}
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Input
                id="price"
                name="price"
                placeholder={t("price")}
                type="number"
                min={0}
                required
              />
            </div>
            <div className="flex-1">
              <Select name="branch" required>
                <SelectTrigger id="branch">
                  <SelectValue placeholder={t("branch")} />
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
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Input
                id="description"
                name="description"
                placeholder={t("description")}
                type="text"
                required
              />
            </div>
            <div className="flex-1 relative rounded-md h-12 bg-[#E5E5E594] border-[#E5E5E57A] font-homenaje placeholder:text-[#BCBCBC]">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 px flex items-center flex-row-reverse justify-between px-6 text-gray-500 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm font-medium truncate max-w-[60%]">
                  {fileName || t("image")}
                </span>
              </div>
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
