import { CourtDetail } from "@/components/courts/court-detail/CourtDetail";
import { getCourtTitle } from "@/database";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const title = await getCourtTitle(id);

  return { title };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <CourtDetail id={id} />;
}
