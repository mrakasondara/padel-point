import toRupiah from "@develoka/angka-rupiah-js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CartItem = ({ court }) => {
  return (
    <div className="flex gap-3 shadow p-2 rounded-md">
      <img
        src={court.image_thumb}
        alt="cart-image"
        className="w-20 max-h-25 rounded-md"
      />
      <div className="flex flex-col w-full">
        <h6 className=" text-[14px] text-main-theme">{court.court_name}</h6>
        <p className=" text-[13px]">{court.address}</p>
        <div className="flex text-[12px] justify-between w-full mt-1 items-center">
          <Select>
            <SelectTrigger className="w-full max-w-40 text-[11px]">
              <SelectValue placeholder="Booked Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Booked Date</SelectLabel>
                {court.selectedDates.map((item) => {
                  return (
                    <SelectItem
                      className="text-[11px]"
                      value={`${new Date(item.date).toLocaleDateString()}:${
                        item.time
                      }`}
                    >
                      {new Date(item.date).toLocaleDateString()} : {item.time}{" "}
                      WIB
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>
            {toRupiah(court.price * court.selectedDates.length, {
              dot: ",",
              floatingPoint: 0,
            })}{" "}
            ({court.selectedDates.length} Item)
          </p>
        </div>
      </div>
    </div>
  );
};
