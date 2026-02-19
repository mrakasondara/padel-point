import { CourtsDialog } from "@/components/admin/courts/CourtsDialog";
import { CourtsList } from "@/components/admin/courts/CourtsList";

export default async function Courts() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">All Courts</h3>
      <CourtsDialog />
      <CourtsList />
    </div>
  );
}
