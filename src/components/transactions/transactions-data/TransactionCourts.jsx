import toRupiah from "@develoka/angka-rupiah-js";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const TransactionCourts = ({ courts }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-4 w-3/4">
        <img
          src={courts[0]?.image_thumb}
          alt="transaction-image"
          className="w-30 max-h-25 rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="text-[15px] font-semibold text-main-theme">
            {courts[0]?.court_name}
          </h4>
          <p className="text-[12px] text-slate-400">
            {courts[0]?.booked_dates.length} date x{" "}
            {toRupiah(
              courts[0]?.total_payment / courts[0]?.booked_dates.length ?? 0,
              {
                dot: ",",
                floatingPoint: 0,
              }
            )}
          </p>
        </div>
      </div>
      {courts.length >= 2 && (
        <Collapsible className="-mt-1">
          <CollapsibleContent className="mb-1">
            {courts.slice(0, 1).map((court) => {
              return (
                <div className="flex gap-4 w-3/4">
                  <img
                    src={court.image_thumb}
                    alt="transaction-image"
                    className="w-30 max-h-25 rounded-md"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-semibold text-main-theme">
                      {court.court_name}
                    </h4>
                    <p className="text-[12px] text-slate-400">
                      {court.booked_dates.length} date x{" "}
                      {toRupiah(
                        court.total_payment / court.booked_dates.length ?? 0,
                        {
                          dot: ",",
                          floatingPoint: 0,
                        }
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </CollapsibleContent>
          <CollapsibleTrigger>
            <span className="text-[14px] flex gap-1 items-center cursor-pointer text-main-theme">
              See more <ChevronsUpDown size="14px" />
            </span>
          </CollapsibleTrigger>
        </Collapsible>
      )}
    </div>
  );
};
