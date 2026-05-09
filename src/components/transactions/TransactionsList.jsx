"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import PadelApi from "@/lib/services/api/padelAPI";
import { errorStyle } from "@/lib/toster-styles";
import { TransactionItem } from "./transactions-data/TransactionItem";
import { TransactionsSkeleton } from "./transactions-data/TransactionsSkeleton";

export const TransactionsList = ({ status = "all" }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getTransactions(status);
      if (response?.success) {
        setTransactions(response.data);
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
    fetchTransactions();
  }, []);

  return (
    <div className="p-3">
      {loading ? (
        <TransactionsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {transactions.length ? (
            transactions.map((transaction, index) => {
              return <TransactionItem transaction={transaction} key={index} />;
            })
          ) : (
            <p>
              Transaction with{" "}
              <span className="text-main-theme font-semibold">{status}</span>{" "}
              status not exist
            </p>
          )}
        </div>
      )}
    </div>
  );
};
