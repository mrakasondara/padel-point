"use client";

import { useState, useEffect } from "react";
import { ExploreItem } from "./ExploreItem";
import PadelApi from "@/lib/services/api/padelAPI";
import { Skeleton } from "@/components/ui/skeleton";

export const Explore = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExplore = async () => {
    setLoading(true);
    try {
      const response = await PadelApi.getCourtsByCityStats();
      if (response?.success) {
        setExploreItems(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExplore();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-16" id="explore">
      <h3 className="text-2xl text-main-theme font-itim">Explore City</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 gap-y-5 px-3 lg:px-[3rem]">
        {loading ? (
          <>
            <Skeleton className="w-[70px] md:w-[120px] h-20" />
            <Skeleton className="w-[70px] md:w-[120px] h-20" />
            <Skeleton className="w-[70px] md:w-[120px] h-20" />
            <Skeleton className="w-[70px] md:w-[120px] h-20" />
          </>
        ) : (
          exploreItems.map((explore, index) => {
            return <ExploreItem {...explore} key={index} />;
          })
        )}
      </div>
    </div>
  );
};
