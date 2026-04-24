import { TransactionsContent } from "@/components/transactions/TransactionsContent";

export const metadata = {
  title: "Transactions",
};

export default function Page() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full gap-[1rem]">
      <h1 className="text-xl text-main-theme font-bold">Your Transactions</h1>
      <TransactionsContent />
    </div>
  );
}
