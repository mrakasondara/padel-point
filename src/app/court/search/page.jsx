import { SearchCourtsGrid } from "@/components/courts/search/SearchCourtsGrid";

export const metadata = {
  title: "Search Courts",
};

export default function SearchPage() {
  return (
    <div className="flex flex-col w-full p-3 bg-sidebar rounded-md shadow-md">
      <SearchCourtsGrid />
    </div>
  );
}
