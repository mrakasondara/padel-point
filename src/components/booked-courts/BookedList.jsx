"use client";
import { useEffect, useState } from "react";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";

import { errorStyle } from "@/lib/toster-styles";
import { BookedSkeleton } from "./BookedSkeleton";
import { BookedItem } from "./BookedItem";

export const BookedList = () => {
  const [loading, setLoading] = useState(false);
  const [bookedCourts, setBookedCourts] = useState({});

  const fetchBookedCourts = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getBookedCourts();
      if (response?.success) {
        setBookedCourts(response.data);
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
    fetchBookedCourts();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-3 lg:gap-7 md:px-3 w-full mt-5">
      {loading ? (
        <BookedSkeleton />
      ) : bookedCourts?.length >= 1 ? (
        bookedCourts.map((court, index) => {
          return <BookedItem {...court} key={index} />;
        })
      ) : (
        "You have no booked courts"
      )}
    </div>
  );
};
