import { CourtsList } from "@/components/explore-courts/CourtsList";

export default function Dashboard() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-12">
      <h3 className="text-2xl text-main-theme font-itim">Explore Courts</h3>
      <CourtsList />
    </div>
  );
}
