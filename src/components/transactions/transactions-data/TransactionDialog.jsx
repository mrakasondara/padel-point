import toRupiah from "@develoka/angka-rupiah-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TransactionCourtDetail } from "./TransactionCourtDetail";
import { Button } from "@/components/ui/button";

export const TransactionDialog = ({ transaction }) => {
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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        size="sm"
        className="ml-auto bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md p-2 transition-colors duration-300 ease-in-out text-[12px]"
      >
        Transaction details
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-md flex justify-between mt-3">
            Transaction Details
            {badgeIcon(transaction?.transaction_status)}
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
          <div className="flex flex-col text-[13px] ">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Transaction Id :</p>
                <p className="text-main-theme font-semibold">
                  PP/{transaction?._id}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Order date :</p>
                <p className="text-main-theme font-semibold">
                  {new Intl.DateTimeFormat("en-US", options).format(
                    new Date(transaction?.createdAt)
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col text-[15px] font-semibold mt-6 gap-3">
              <h3>Products Details</h3>
              {transaction?.courts.map((court, index) => {
                return (
                  <TransactionCourtDetail
                    court={court}
                    status={transaction?.transaction_status}
                    key={index}
                  />
                );
              })}
            </div>

            <div className="flex flex-col text-[13px] mt-6">
              <h3 className="text-[15px] font-semibold mb-3">
                Payment Details
              </h3>
              {transaction?.transaction_status === "paid" && (
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Payment Date</p>
                  <p className="capitalize">
                    {new Intl.DateTimeFormat("en-US", options).format(
                      new Date(transaction?.transaction_time)
                    )}
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <p className="text-muted-foreground">Payment Method</p>
                <p className="capitalize">{transaction?.payment_type}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Payment Status</p>
                <p className="capitalize">{transaction?.transaction_status}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6 text-[15px] font-semibold">
              <h3>Payment Details</h3>
              <p>
                {toRupiah(transaction?.total_payment ?? 0, {
                  dot: ",",
                  floatingPoint: 0,
                })}
              </p>
            </div>

            {transaction?.transaction_status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto border border-main-theme text-main-theme dark:bg-input/30 dark:hover:bg-input/50 dark:text-constant dark:border cursor-pointer rounded-md transition-colors duration-300 ease-in-out text-[14px] -py-1 px-9 mt-5 font-semibold"
                onClick={() => snap.pay(transaction?.snap_token)}
              >
                Pay Now
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
