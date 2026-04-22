import { Skeleton } from "../ui/skeleton";

export const BookedSkeleton = () => {
  return (
    <>
      <div className="rounded-lg flex flex-col relative gap-3 overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex w-full justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="rounded-lg flex flex-col relative gap-3 overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex w-full justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="rounded-lg flex flex-col relative gap-3 overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex w-full justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>
    </>
  );
};
