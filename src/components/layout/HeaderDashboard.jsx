"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Icon } from "./Icon";
import { ToggleTheme } from "./ToggleTheme";
export const HeaderDashboard = () => {
  return (
    <header className="flex mt-5 items-center mx-5" id="header-dashboard">
      <Icon />
      <SidebarTrigger className="cursor-pointer mx-2 text-main-theme" />
      <div className="flex items-center ml-auto gap-2">
        <ToggleTheme id="toggle-dashboard" />
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
