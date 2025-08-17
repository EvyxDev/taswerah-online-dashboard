"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SwitchLocale } from "./components/switch-locale";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    (e?: React.FormEvent | React.MouseEvent) => {
      if (e) e.preventDefault();

      const params = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
        params.set("page", "1");
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchValue, searchParams, pathname, router]
  );

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-20 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex-1 mx-4 max-w-md flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />

          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <button
              type="submit"
              onClick={handleSearchSubmit}
              className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 ${
                isRTL ? "right-3" : "left-3"
              }`}
            >
              <Search className="w-full h-full" />
            </button>
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={searchValue}
              onChange={handleSearchChange}
              className={`bg-[#F5F6FA] border-[#D5D5D5] rounded-full font-homenaje ${
                isRTL ? "pr-10 text-right" : "pl-10 text-left"
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </form>
        </div>
        <div className="flex items-center gap-2">
          <SwitchLocale />
        </div>
      </div>
    </header>
  );
}
