import Link from "next/link";
import { FavoriteItem } from "../favorites/FavoriteItem";

export const DashboardFavoriteCourts = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-main-theme">
          Your Favorite Courts
        </h2>
        <Link href="/dashboard/favorite" className="text-main-theme text-sm">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 lg:gap-7 md:px-3 w-full pt-5">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>
    </div>
  );
};
