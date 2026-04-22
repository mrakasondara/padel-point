"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { toast } from "sonner";
import { successStyle, errorStyle } from "@/lib/toster-styles";
import PadelApi from "@/lib/services/api/padelAPI";
import { BookedSkeleton } from "../booked-courts/BookedSkeleton";
import { BookedItem } from "../booked-courts/BookedItem";

export const DashboardLatestBooking = () => {
  const [bookedCourts, setBookedCourts] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchBookedCourts = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getBookedCourts(3);
      if (response?.success) {
        setBookedCourts(response.data.courts);
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
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-main-theme">
          Latest Booking Courts
        </h2>
        <Link href="/dashboard/booked" className="text-main-theme text-sm">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 md:px-3 w-full pt-5">
        {loading ? (
          <BookedSkeleton />
        ) : bookedCourts.length >= 1 ? (
          bookedCourts.map((court, index) => {
            return <BookedItem {...court} key={index} />;
          })
        ) : (
          "You have no booked courts"
        )}
      </div>
    </div>
  );
};
