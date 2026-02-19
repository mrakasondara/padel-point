import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Layout({ children }) {
  const user = await getServerSession(authOptions);
  if (user?.user.role == "user") {
    redirect("/dashboard", RedirectType.replace);
  }

  return <>{children}</>;
}
