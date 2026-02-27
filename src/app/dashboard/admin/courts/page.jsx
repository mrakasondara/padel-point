import { CourtsDialog } from "@/components/admin/courts/CourtsDialog";
import { CourtsList } from "@/components/admin/courts/CourtsList";
import { Spinner } from "@/components/ui/spinner";
import adminPadelAPI from "@/lib/services/api/adminPadelAPI";
import { Suspense } from "react";

export default async function Courts() {
  const response = await adminPadelAPI.getCourts();
  const data = response.data;

  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">All Courts</h3>
      <Suspense fallback={<Spinner />}>
        <CourtsDialog />
        <CourtsList data={data} />
      </Suspense>
    </div>
  );
}
