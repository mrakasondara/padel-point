"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";
import { ToggleTheme } from "./ToggleTheme";

export const Header = () => {
  const activePath = usePathname();
  return (
    <header
      className={`${
        activePath == "/signin" || activePath == "/signup" ? "hidden" : "flex"
      } mt-5 items-center mx-5`}
      id="header-landing"
    >
      <Icon id="icon-landing" />
      <div className="flex items-center ml-auto gap-2">
        <ToggleTheme id="toggle-landing" />
        <Button
          variant="outline"
          className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins text-[12px]"
          size="sm"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};
