import { Star } from "lucide-react";
import toRupiah from "@develoka/angka-rupiah-js";
import Link from "next/link";

export const CourtItem = ({
  _id,
  court_name,
  city,
  rate,
  price,
  image_thumb,
}) => {
  return (
    <div className="rounded-lg flex flex-col justify-end relative h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden">
      <img
        src={image_thumb}
        alt={city}
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
          <h4 className="text-[13px] z-5 font-poppins">{city}</h4>
        </div>
        <div className="flex justify-end gap-2 text-[11px]">
          <span className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 rounded-lg">
            {rate ?? "-"}
            <Star size="12px" />
          </span>
          <span className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 rounded-lg">
            {toRupiah(price, { useUnit: true, floatingPoint: 0 })}/hr
          </span>
        </div>
      </div>
    </div>
  );
};
