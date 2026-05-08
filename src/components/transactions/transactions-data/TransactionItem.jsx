"use client";

import toRupiah from "@develoka/angka-rupiah-js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TransactionCourts } from "./TransactionCourts";
import { TransactionDialog } from "./TransactionDialog";

export const TransactionItem = ({ transaction }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const badgeIcon = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-md">
            Paid
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-md">
            Failed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300 rounded-md">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 rounded-md">
            Expire
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-2 border lg:w-[30%] p-3 rounded-md mb-3">
      <div className="flex justify-between items-center text-[12px]">
        <p>
          {new Intl.DateTimeFormat("en-US", options).format(
            new Date(transaction?.createdAt)
          )}
          <span className="ml-1">-</span> PP/{transaction?._id}
        </p>
        {badgeIcon(transaction?.transaction_status)}
      </div>

      <div className="flex items-center">
        <TransactionCourts courts={transaction?.courts} />
        <div className="w-1/4 border-black dark:border-constant h-1/2 border-l-2 flex flex-col justify-center items-center text-sm">
          <p>Total :</p>
          <p className="font-semibold">
            {toRupiah(transaction?.total_payment ?? 0, {
              dot: ",",
              floatingPoint: 0,
            })}
          </p>
        </div>
      </div>
      <TransactionDialog transaction={transaction} />
    </div>
  );
};
