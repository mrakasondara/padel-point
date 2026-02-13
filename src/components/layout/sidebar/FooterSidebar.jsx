"use client";
import { SidebarFooter, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronsDownUp, User, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export const FooterSidebar = () => {
  return (
    <SidebarFooter className="bg-sidebar px-5 mb-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="py-7">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
            <div className="flex flex-col text-main-theme font-poppins">
              <h6>Anonim</h6>
              <span className="text-[11.8px] text-black dark:text-constant">
                anonim@example.co
              </span>
            </div>
            <ChevronsDownUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
          <DropdownMenuItem className="flex cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer">
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
};
