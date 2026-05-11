"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const PaymentNavigation = ({
  transaction_status = "pending",
  snap_token,
}) => {
  return (
    <>
      {transaction_status === "pending" ? (
        <Button
          variant="outline"
          className="my-5 bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins"
          onClick={() => snap.pay(snap_token)}
        >
          Paynow
        </Button>
      ) : (
        <>
          <Link href="/dashboard/transactions">
            <Button
              variant="outline"
              className="my-5 bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins"
            >
              Back to dashboard
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
