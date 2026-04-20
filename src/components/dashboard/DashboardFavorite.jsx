"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FavoriteItem } from "../favorites/FavoriteItem";
import { FavoriteSkeleton } from "../favorites/FavoriteSkeleton";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toster-styles";

export const DashboardFavoriteCourts = () => {
  const [favoriteCourts, setFavoriteCourts] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getFavoriteCourts(3);
      if (response?.success) {
        setFavoriteCourts(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

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
        {loading ? (
          <FavoriteSkeleton />
        ) : favoriteCourts?.length >= 1 ? (
          favoriteCourts.map((court, index) => (
            <FavoriteItem {...court} key={index} />
          ))
        ) : (
          "You have no favorite courts"
        )}
      </div>
    </div>
  );
};
