"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search, CalendarCheck2, Heart } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const ContentSidebar = () => {
  const pathActive = usePathname();
  return (
    <SidebarContent className="bg-sidebar px-5 list-none font-itim">
      <SidebarGroup>
        <SidebarMenuItem>
          <Link href={"/"}>
            <SidebarMenuButton
              className={`gap-5 text-md lg:text-lg ${
                pathActive == "/dashboard"
                  ? "dark:bg-accent bg-main-theme/30"
                  : ""
              }`}
            >
              <House /> Home
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`gap-5 text-md lg:text-lg ${
              pathActive == "/search" ? "dark:bg-accent bg-main-theme/30" : ""
            }`}
          >
            <Search /> Search
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`gap-5 text-md lg:text-lg ${
              pathActive == "/booked" ? "dark:bg-accent bg-main-theme/30" : ""
            }`}
          >
            <CalendarCheck2 /> Booked
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`gap-5 text-md lg:text-lg ${
              pathActive == "/favorite" ? "dark:bg-accent bg-main-theme/30" : ""
            }`}
          >
            <Heart /> Favorite
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarContent>
  );
};
