import { DashboardFavoriteCourts } from "./DashboardFavorite";
import { DashboardLatestBooking } from "./LatestBooking";

export const DashboardStats = () => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col w-full gap-[4rem]">
        <DashboardLatestBooking />
        <DashboardFavoriteCourts />
      </div>
    </div>
  );
};
