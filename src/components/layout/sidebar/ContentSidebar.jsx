"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Search,
  CalendarCheck2,
  Heart,
  Users,
  List,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const ContentSidebar = ({ data }) => {
  const activePath = usePathname();

  return (
    <SidebarContent className="bg-sidebar px-5 list-none font-itim">
      <SidebarGroup>
        <SidebarMenuItem>
          <Link href={"/"}>
            <SidebarMenuButton
              className={`gap-5 text-md lg:text-lg ${
                activePath == "/dashboard"
                  ? "dark:bg-accent bg-main-theme/70 text-white"
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
              activePath == "/dashboard/search"
                ? "dark:bg-accent bg-main-theme/70 text-white"
                : ""
            }`}
          >
            <Search /> Search
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>

      {data?.user.role == "user" ? (
        <>
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`gap-5 text-md lg:text-lg ${
                  activePath == "/dashboard/booked"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
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
                  activePath == "/dashboard/favorite"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
                }`}
              >
                <Heart /> Favorite
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </>
      ) : (
        <>
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`gap-5 text-md lg:text-lg ${
                  activePath == "/dashboard/admin/users"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
                }`}
              >
                <Users /> Users
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`gap-5 text-md lg:text-lg ${
                  activePath == "/dashboard/admin/users"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
                }`}
              >
                <List /> Courts
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </>
      )}
    </SidebarContent>
  );
};
