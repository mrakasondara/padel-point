"use client";

import { useEffect, useState } from "react";
import { MapPinned, Star, ExternalLink } from "lucide-react";
import toRupiah from "@develoka/angka-rupiah-js";

import PadelApi from "@/lib/services/api/padelAPI";
import { Loading } from "@/components/layout/Loading";
import { facilityItems } from "@/lib/facilities";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SearchCourtDetail = ({ id }) => {
  const [court, setCourt] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetailCourt = async () => {
    try {
      setIsLoading(true);
      const response = await PadelApi.getDetailCourt(id);
      if (response?.success) {
        setCourt(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCourt();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <>
          <div className="flex flex-col justify-end relative w-full rounded-lg h-[23rem]">
            <img
              src={court?.image_thumb}
              alt={court?.court_name}
              className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
            />
            <section className="flex flex-col p-3 z-5 text-constant rounded-lg  bg-black/20 backdrop-blur-[2px]">
              <h4 className="text-[20px] font-itim">{court?.court_name}</h4>
              <div className="flex gap-1 items-center mt-2">
                <MapPinned size="11" />
                <h4 className="text-[13px] z-5 font-poppins">{court?.city}</h4>
              </div>
              <div className="flex gap-3 text-[13px] mt-2">
                <span className="flex items-center gap-1">
                  {court?.rate ?? "-"}
                  <Star size="12px" />
                </span>
                <span className="flex items-center">
                  {toRupiah(court?.price ?? 0, {
                    useUnit: true,
                    floatingPoint: 0,
                  })}
                  /hour
                </span>
              </div>
            </section>
          </div>

          <section className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-2xl font-itim text-main-theme">
                Description
              </h3>
              <p className="text-[15px]">{court?.description}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-2xl font-itim text-main-theme">
                What this place offer
              </h3>
              <div className="grid grid-cols-2 p-3 gap-5">
                {court?.facilities?.map((facilityValue) => {
                  const facility = facilityItems.find(
                    (item) => item.name == facilityValue
                  );
                  if (!facility) return null;

                  const Icon = facility.icon;

                  return (
                    <div
                      className="flex gap-2 items-center text-[13px]"
                      key={facility.name}
                    >
                      <Icon className="text-main-theme" />
                      <span>{facility.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <Link href={`/court/${court._id}`} target="_blank">
            <Button
              type="submit"
              className="w-full md:w-2/4 lg:w-1/4 bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant"
            >
              <ExternalLink /> Go to detail page
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
