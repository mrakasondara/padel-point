"use client";
import { useEffect, useState } from "react";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";

import { FavoriteItem } from "./FavoriteItem";
import { errorStyle } from "@/lib/toster-styles";
import { FavoriteSkeleton } from "./FavoriteSkeleton";

export const FavoriteList = () => {
  const [loading, setLoading] = useState(false);
  const [favoriteCourts, setFavoriteCourts] = useState({});

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getFavoriteCourts();
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-3 lg:gap-7 md:px-3 w-full mt-5">
      {loading ? (
        <FavoriteSkeleton />
      ) : favoriteCourts?.length >= 1 ? (
        favoriteCourts.map((court) => {
          return <FavoriteItem {...court} key={court._id} />;
        })
      ) : (
        "You have no favorite courts"
      )}
    </div>
  );
};
