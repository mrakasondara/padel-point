"use client";
import { useEffect, useState } from "react";
import { Loading } from "@/components/layout/Loading";
import { CourtItem } from "./CourtItem";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";

export const CourtsGrid = () => {
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourts = async () => {
    try {
      setIsLoading(true);
      const response = await PadelApi.getCourts();
      if (response?.success) {
        setCourts(response.data);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 w-full ${
        isLoading ? "justify-center items-center" : ""
      }`}
    >
      {isLoading ? (
        <Loading message={"Loading"} />
      ) : (
        courts.map((court) => {
          return <CourtItem {...court} key={court._id} />;
        })
      )}
    </div>
  );
};
