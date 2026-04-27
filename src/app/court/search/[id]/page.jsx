import { getCourtTitle } from "@/database";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const title = await getCourtTitle(id);

  return { title };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <h1>{id}</h1>;
}
