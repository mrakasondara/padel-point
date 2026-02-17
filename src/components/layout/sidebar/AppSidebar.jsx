"use client";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Icon } from "../Icon";
import { FooterSidebar } from "./FooterSidebar";
import { ContentSidebar } from "./ContentSidebar";

export const AppSidebar = () => {
  const { data } = useSession();

  return (
    <Sidebar className="bg-sidebar">
      <SidebarHeader className="bg-sidebar flex px-5 py-[2rem] justify-center items-center">
        <Icon color="main" />
      </SidebarHeader>
      <ContentSidebar data={data} />
      <FooterSidebar data={data} />
    </Sidebar>
  );
};
