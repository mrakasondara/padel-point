"use client";
import { Star, MapPinned, EllipsisVertical } from "lucide-react";
import toRupiah from "@develoka/angka-rupiah-js";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";

export const SearchCourtItem = ({
  _id,
  court_name,
  city,
  rate,
  price,
  image_thumb,
}) => {
  const [loading, setLoading] = useState(false);

  const onAddFavorite = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.addToFavorite({ id: _id, court_name });
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg flex flex-col justify-end relative h-62.5 md:h-70 lg:h-75 overflow-hidden">
      <img
        src={image_thumb}
        alt={city}
        className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
      />
      <div className="flex flex-col p-3 z-5 text-constant bg-black/20 backdrop-blur-[2px]">
        <div className="flex flex-col">
          <Link
            href={`/court/search/${_id}`}
            className="underline hover:text-main-theme/50 transition-colors ease-in-out"
          >
            <h4 className="text-[19px] font-itim">{court_name}</h4>
          </Link>
          <div className="flex gap-1 items-center">
            <MapPinned size="11" />
            <h4 className="text-[13px] z-5 font-poppins">{city}</h4>
          </div>
        </div>
        <div className="flex justify-end gap-2 text-[11px] mt-2">
          <span className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 rounded-lg">
            {rate ?? "-"}
            <Star size="12px" />
          </span>
          <span className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 rounded-lg">
            {toRupiah(price, { useUnit: true, floatingPoint: 0 })}/hour
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="xs"
                className="bg-white/30 hover:bg-white/60 backdrop-blur-sm border-0 cursor-pointer"
              >
                {loading ? <Spinner /> : <EllipsisVertical />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              <DropdownMenuItem
                className="text-[12px] cursor-pointer"
                onClick={onAddFavorite}
              >
                Add to favorite
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
