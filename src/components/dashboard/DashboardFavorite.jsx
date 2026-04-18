import Link from "next/link";
import { MapPinned } from "lucide-react";

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

const FavoriteItem = () => {
  return (
    <div className="rounded-lg flex flex-col justify-end relative h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden">
      <img
        src="/images/courts/jasper.jpg"
        className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
      />
      <div className="flex flex-col p-3 z-5 text-constant bg-black/20 backdrop-blur-[2px]">
        <div className="flex flex-col">
          <Link
            href={`/court/`}
            className="underline hover:text-main-theme/50 transition-colors ease-in-out"
          >
            <h4 className="text-[19px] font-itim">Padel Hub</h4>
          </Link>
          <div className="flex gap-1 items-center">
            <MapPinned size="11" />
            <h4 className="text-[13px] z-5 font-poppins">Jakarta</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
