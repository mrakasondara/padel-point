import { Skeleton } from "../ui/skeleton";

export const FavoriteSkeleton = () => {
  return (
    <>
      <div className="rounded-lg flex flex-col relative overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex flex-col gap-3 mt-auto mb-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="rounded-lg flex flex-col relative overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex flex-col gap-3 mt-auto mb-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="rounded-lg flex flex-col relative overflow-hidden">
        <Skeleton className="aspect-video w-full h-3/4" />
        <div className="flex flex-col gap-3 mt-auto mb-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </>
  );
};
