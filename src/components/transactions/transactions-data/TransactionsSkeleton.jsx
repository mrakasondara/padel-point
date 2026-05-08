import { Skeleton } from "@/components/ui/skeleton";

export const TransactionsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Skeleton className="w-[20rem] h-25" />
      <Skeleton className="w-[20rem] h-25" />
      <Skeleton className="w-[20rem] h-25" />
    </div>
  );
};
