import { Suspense } from "react";
import { SearchCourtsGrid } from "@/components/courts/search/SearchCourtsGrid";
import { Loading } from "@/components/layout/Loading";

export const metadata = {
  title: "Search Courts",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading message="Loading..." />}>
      <div className="flex flex-col w-full p-3 bg-sidebar rounded-md shadow-md">
        <SearchCourtsGrid />
      </div>
    </Suspense>
  );
}
