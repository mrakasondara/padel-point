import { SideImage } from "@/components/auth/SideImage";
import { SignInForm } from "@/components/auth/SignInForm";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

export const metadata = {
  title: "Sign In",
};

export default async function Page() {
  const user = await getServerSession();
  if (user) {
    redirect("/dashboard", RedirectType.replace);
  }
  return (
    <div className="flex gap-3 h-screen p-5">
      <SideImage page="signin" />
      <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
}
