"use client";

import { IoLogOut } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("logout");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const route = useRouter();
  return (
    <>
      <div className={`mb-10 ${isRTL ? "pr-6" : "pl-6"}`}>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-3 text-white text-2xl font-homenaje hover:text-gray-300 transition-colors"
        >
          <IoLogOut
            className={`text-gray-400 text-2xl ${
              isRTL ? "rotate-0" : "rotate-180"
            }`}
          />
          {t("logOut")}
        </button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-center px-10 py-12 rounded-3xl sm:max-w-3xl sm:px-16">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-4xl font-medium font-homenaje">
              {t("logOut")}
            </DialogTitle>
            <DialogDescription className="text-4xl font-homenaje text-gray-500 mt-3">
              {t("confirmMessage")}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-8">
            <Image
              src="/assets/logout.png"
              alt="Logout"
              width={120}
              height={80}
            />
          </div>

          <div
            className={`flex justify-center gap-20 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <button
              className="main-button w-1/2 font-homenaje"
              onClick={() => {
                route.push("/auth/login");
              }}
            >
              {t("logOut")}
            </button>
            <button
              className="main-button-border w-1/2 font-homenaje !text-2xl"
              onClick={() => setIsDialogOpen(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
