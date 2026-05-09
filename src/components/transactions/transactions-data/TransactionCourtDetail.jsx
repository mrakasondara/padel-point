"use client";
import Link from "next/link";
import toRupiah from "@develoka/angka-rupiah-js";
import { Button } from "@/components/ui/button";

export const TransactionCourtDetail = ({ court, status }) => {
  return (
    <div className="flex">
      <div className="flex gap-4 w-3/4">
        <img
          src={court.image_thumb}
          alt="transaction-image"
          className="w-30 max-h-25 rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="text-[13.5px] font-semibold text-main-theme">
            {court.court_name}
          </h4>
          <p className="text-[11px] text-muted-foreground">
            {court.booked_dates.length} date x{" "}
            {toRupiah(court.total_payment / court.booked_dates.length ?? 0, {
              dot: ",",
              floatingPoint: 0,
            })}
          </p>
        </div>
      </div>
      {status === "paid" && (
        <Link href={`/court/${court.court_id}`} className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto border border-main-theme text-main-theme dark:bg-input/30 dark:hover:bg-input/50 dark:text-constant dark:border cursor-pointer rounded-md p-2 transition-colors duration-300 ease-in-out text-[12px]"
          >
            Book again
          </Button>
        </Link>
      )}
    </div>
  );
};
