"use client";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

import { Icon } from "../Icon";
import { FooterSidebar } from "./FooterSidebar";
import { ContentSidebar } from "./ContentSidebar";

export const AppSidebar = () => {
  return (
    <Sidebar className="bg-sidebar">
      <SidebarHeader className="bg-sidebar flex px-5 py-[2rem] justify-center items-center">
        <Icon color="main" />
      </SidebarHeader>
      <ContentSidebar />
      <FooterSidebar />
    </Sidebar>
  );
};
