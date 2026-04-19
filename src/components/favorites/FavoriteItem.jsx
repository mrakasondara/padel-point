"use client";
import Link from "next/link";
import { MapPinned, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const FavoriteItem = ({ _id, court_name, city, image_thumb }) => {
  const [loading, setLoading] = useState(false);

  const onRemoveFavorite = async () => {};

  return (
    <div className="rounded-lg flex flex-col justify-end relative h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden">
      <img
        src={image_thumb}
        alt={court_name}
        className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
      />
      <div className="flex flex-col p-3 z-5 text-constant bg-black/20 backdrop-blur-[2px]">
        <div className="flex flex-col">
          <Link
            href={`/court/${_id}`}
            className="underline hover:text-main-theme/50 transition-colors ease-in-out"
          >
            <h4 className="text-[19px] font-itim">{court_name}</h4>
          </Link>
          <div className="flex gap-1 items-center">
            <MapPinned size="11" />

            <h4 className="text-[13px] z-5 font-poppins mr-auto">{city}</h4>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="transparent"
                  size="xs"
                  className="cursor-pointer"
                >
                  {loading ? <Spinner /> : <EllipsisVertical />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <DropdownMenuItem
                  className="text-[12px] cursor-pointer"
                  onClick={onRemoveFavorite}
                >
                  Remove from favorite
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
