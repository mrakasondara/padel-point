"use client";

import { useEffect, useState } from "react";
import PadelApi from "@/lib/services/api/padelAPI";
import { PaymentDescription } from "./PaymentDescription";
import { PaymentIcon } from "./PaymentIcon";
import { PaymentNavigation } from "./PaymentNavigation";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toster-styles";
import { Skeleton } from "../ui/skeleton";

export const PaymentContent = ({ id }) => {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetailTransaction = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getDetailTransaction(id);
      if (response?.success) {
        setTransaction(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailTransaction();
  }, []);

  return (
    <div className="p-3 rounded-md bg-sidebar border flex flex-col text-center w-1/2 lg:w-1/4">
      {loading ? (
        <Skeleton className="w-full h-50" />
      ) : (
        <>
          <PaymentIcon transaction_status={transaction?.transaction_status} />
          <PaymentDescription
            transaction_status={transaction?.transaction_status}
          />
          <PaymentNavigation
            transaction_status={transaction?.transaction_status}
            snap_token={transaction?.snap_token}
          />
        </>
      )}
    </div>
  );
};
