import { FavoriteList } from "@/components/favorites/FavoriteList";

export const metadata = {
  title: "Favorite Courts",
};

export default async function FavoritePage() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full gap-[1rem]">
      <h1 className="text-xl text-main-theme font-bold">
        Your Favorite Courts
      </h1>
      <FavoriteList />
    </div>
  );
}
