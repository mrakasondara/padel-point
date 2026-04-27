"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/layout/Loading";
import { SearchCourtItem } from "./SearchCourtItem";
import PadelApi from "@/lib/services/api/padelAPI";

export const SearchCourtsGrid = () => {
  const searchParams = useSearchParams();
  const stringSearchParams = searchParams.toString();

  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCourts, setTotalCourts] = useState(0);

  const fetchCourts = async () => {
    try {
      setIsLoading(true);
      const response = await PadelApi.searchCourts(stringSearchParams);
      if (response?.success) {
        setCourts(response.data);
        console.log(response);
        setTotalCourts(response.total);
      } else {
        console.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      console.error(error.message, { style: errorStyle });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [stringSearchParams]);

  return (
    <div className="flex flex-col py-5">
      {!isLoading && (
        <h4 className="font-semibold text-md">
          {totalCourts ? `${totalCourts} courts found` : "No courts found"}
        </h4>
      )}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 w-full ${
          isLoading ? "justify-center items-center" : ""
        }`}
      >
        {isLoading ? (
          <Loading message={"Loading"} />
        ) : (
          courts.map((court) => {
            return <SearchCourtItem {...court} key={court._id} />;
          })
        )}
      </div>
    </div>
  );
};
