"use client";

import { useEffect, useState } from "react";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toster-styles";
import { HiglightLoading } from "./HiglightLoading";
import { HiglightContent } from "./HiglightContent";

export const Higlight = () => {
  const [courts, setCourts] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getCourts(4);
      if (response?.success) {
        setCourts(response.data);
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
    fetchCourts();
  }, []);

  return (
    <div
      className="flex gap-x-3 lg:gap-x-5 mt-16 h-81.25 md:h-95.5 lg:w-3/4 lg:mx-auto md:justify-center mb-5"
      id="highlight"
    >
      {loading ? <HiglightLoading /> : <HiglightContent courts={courts} />}
    </div>
  );
};
