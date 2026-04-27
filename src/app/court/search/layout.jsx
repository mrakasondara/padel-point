import { SearchFilter } from "@/components/courts/search/SearchFilter";

export default async function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <SearchFilter />
      {children}
    </div>
  );
}
