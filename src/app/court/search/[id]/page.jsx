import { getCourtTitle } from "@/database";
import { SearchCourtDetail } from "@/components/courts/search/SearchCourtDetail";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const title = await getCourtTitle(id);

  return { title };
}

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="flex flex-col w-full py-8 px-5 bg-sidebar rounded-md shadow-md">
      <SearchCourtDetail id={id} />
    </div>
  );
}
