import toRupiah from "@develoka/angka-rupiah-js";

export const HiglightContent = ({ courts }) => {
  // console.log(courts);
  return (
    <>
      <LargeItem court={courts[0]} />

      <div className="flex flex-col w-1/2 md:w-[40%] lg:w-[30%] gap-2">
        <SmallItem court={courts[1]} />
        <SmallItem court={courts[2]} />
      </div>

      <LargeItem court={courts[3]} />
    </>
  );
};

const SmallItem = ({ court }) => {
  return (
    <div className="flex flex-col rounded-lg relative w-full h-1/2 justify-end">
      <img
        src={court?.image_thumb}
        alt={`thumb-${court?.court_name ?? ""}`}
        className="absolute object-cover top-0 z-5 rounded-lg h-full w-125"
      />
      <div className="flex flex-col p-3 z-5 text-constant rounded-b-lg bg-black/10 backdrop-blur-[2px]">
        <h4 className="text-[19px] font-itim">{court?.court_name}</h4>
        <h4 className="text-[13px] z-5 font-poppins">
          {toRupiah(court?.price ?? 0, { useUnit: true, floatingPoint: 0 })}
          /hour
        </h4>
      </div>
    </div>
  );
};

const LargeItem = ({ court }) => {
  return (
    <div className="rounded-lg flex flex-col justify-end relative w-1/2 md:w-[30%] lg:w-[25%] overflow-hidden">
      <img
        src={court?.image_thumb}
        alt={`thumb-${court?.court_name ?? ""}`}
        className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
      />
      <div className="flex flex-col p-3 z-5 text-constant bg-black/10 backdrop-blur-[2px]">
        <h4 className="text-[19px] font-itim">{court?.court_name}</h4>
        <h4 className="text-[13px] z-5 font-poppins">
          {toRupiah(court?.price ?? 0, { useUnit: true, floatingPoint: 0 })}
          /hour
        </h4>
      </div>
    </div>
  );
};
