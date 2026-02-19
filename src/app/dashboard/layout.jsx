import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }) {
  const user = await getServerSession(authOptions);
  if (!user) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex flex-col w-full relative mt-3">
        <SidebarTrigger className="absolute -mx-2 text-lg shadow shadow-main-theme -mt-3  cursor-pointer text-main-theme" />
        {children}
      </main>
    </SidebarProvider>
  );
}
