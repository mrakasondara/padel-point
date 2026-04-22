"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { TicketCheck } from "lucide-react";
import Link from "next/link";

export const DashboardGreets = () => {
  const { data } = useSession();
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl text-main-theme font-bold">
          Hello, {data?.user.fullName}
        </h1>
        <p className="text-[13px] text-slate-300">
          Today is {new Date().toDateString()}
        </p>
      </div>
      <Link href={"/court"}>
        <Button
          variant="outline"
          className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins "
        >
          <TicketCheck />
          Book court
        </Button>
      </Link>
    </div>
  );
};
