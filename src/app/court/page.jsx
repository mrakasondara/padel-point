import { CourtsGrid } from "@/components/dashboard/explore-courts/CourtsGrid";

export const metadata = {
  title: "Explore Courts",
};

export default async function CourtPage() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">Explore Courts</h3>
      <CourtsGrid />
    </div>
  );
}
