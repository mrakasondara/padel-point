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
  LayoutDashboard,
  CreditCard,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export const ContentSidebar = ({ data }) => {
  const activePath = usePathname();

  return (
    <SidebarContent className="bg-sidebar px-5 list-none font-itim">
      <SidebarGroup className="gap-5">
        <SidebarGroupLabel className="text-md lg:text-lg -mb-3">
          Main
        </SidebarGroupLabel>
        <SidebarMenuItem>
          <Link href={"/"}>
            <SidebarMenuButton
              className={`gap-5 text-md lg:text-lg ${
                activePath == "/"
                  ? "dark:bg-accent bg-main-theme/70 text-white"
                  : ""
              }`}
            >
              <House /> Home
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        {data?.user.role == "user" && (
          <SidebarMenuItem>
            <Link href="/dashboard">
              <SidebarMenuButton
                className={`gap-5 text-md lg:text-lg ${
                  activePath == "/dashboard"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
                }`}
              >
                <LayoutDashboard /> Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )}
      </SidebarGroup>

      <SidebarGroup className="gap-5">
        <SidebarGroupLabel className="text-md lg:text-lg -mb-3">
          Courts
        </SidebarGroupLabel>
        <SidebarMenuItem>
          <Link href="/court">
            <SidebarMenuButton
              className={`gap-5 text-md lg:text-lg ${
                activePath == "/court"
                  ? "dark:bg-accent bg-main-theme/70 text-white"
                  : ""
              }`}
            >
              <List /> Courts
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/court/search">
            <SidebarMenuButton
              className={`gap-5 text-md lg:text-lg ${
                activePath == "/court/search"
                  ? "dark:bg-accent bg-main-theme/70 text-white"
                  : ""
              }`}
            >
              <Search /> Search
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {data?.user.role == "user" && (
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
        )}
        {data?.user.role == "admin" ||
          (data?.user.role == "superadmin" && (
            <SidebarMenuItem>
              <Link href="/dashboard/admin/courts">
                <SidebarMenuButton
                  className={`gap-5 text-md lg:text-lg ${
                    activePath == "/dashboard/admin/courts"
                      ? "dark:bg-accent bg-main-theme/70 text-white"
                      : ""
                  }`}
                >
                  <List /> Admin Courts
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarGroup>

      <SidebarGroup className="gap-5">
        {data?.user.role == "user" && (
          <>
            <SidebarGroupLabel className="text-md lg:text-lg -mb-3">
              Personal
            </SidebarGroupLabel>
            <SidebarMenuItem>
              <Link href="/dashboard/favorites">
                <SidebarMenuButton
                  className={`gap-5 text-md lg:text-lg ${
                    activePath == "/dashboard/favorites"
                      ? "dark:bg-accent bg-main-theme/70 text-white"
                      : ""
                  }`}
                >
                  <Heart /> Favorites
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </>
        )}
        {data?.user.role == "superadmin" && (
          <>
            <SidebarGroupLabel className="text-md lg:text-lg -mb-3">
              Personal
            </SidebarGroupLabel>
            <SidebarMenuItem>
              <Link href="/dashboard/admin/users">
                <SidebarMenuButton
                  className={`gap-5 text-md lg:text-lg ${
                    activePath == "/dashboard/admin/users"
                      ? "dark:bg-accent bg-main-theme/70 text-white"
                      : ""
                  }`}
                >
                  <Users /> Users
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </>
        )}
      </SidebarGroup>

      {data?.user.role == "user" && (
        <SidebarGroup className="gap-5">
          <SidebarGroupLabel className="text-md lg:text-lg -mb-3">
            Finance
          </SidebarGroupLabel>
          <SidebarMenuItem>
            <Link href="/dashboard/transactions">
              <SidebarMenuButton
                className={`gap-5 text-md lg:text-lg ${
                  activePath == "/dashboard/transactions"
                    ? "dark:bg-accent bg-main-theme/70 text-white"
                    : ""
                }`}
              >
                <CreditCard /> Transactions
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};
