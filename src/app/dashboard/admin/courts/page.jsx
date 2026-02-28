"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CourtsDialog } from "@/components/admin/courts/CourtsDialog";
import { CourtsList } from "@/components/admin/courts/CourtsList";
import adminPadelAPI from "@/lib/services/api/adminPadelAPI";
import { errorStyle } from "@/lib/toster-styles";
import { Loading } from "@/components/layout/Loading";

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourts = async () => {
    try {
      setIsLoading(true);
      const response = await adminPadelAPI.getCourts();
      if (response?.success) {
        setCourts(response?.data);
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
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">All Courts</h3>
      {isLoading ? (
        <Loading message={"Loading..."} />
      ) : (
        <>
          <CourtsDialog fetchCourts={fetchCourts} />
          <CourtsList data={courts} />
        </>
      )}
    </div>
  );
}
