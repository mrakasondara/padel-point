import { SideImage } from "@/components/auth/SideImage";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

export default async function Page() {
  const user = await getServerSession();
  if (user) {
    redirect("/dashboard", RedirectType.replace);
  }
  return (
    <div className="flex gap-3 h-screen p-5">
      <SideImage page="signup" />
      <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center">
        <SignUpForm />
      </div>
    </div>
  );
}
