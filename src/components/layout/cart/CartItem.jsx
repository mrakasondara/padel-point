import toRupiah from "@develoka/angka-rupiah-js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TrashIcon } from "lucide-react";

export const CartItem = ({ court, remove, loading }) => {
  return (
    <div className="flex gap-3 shadow p-2 rounded-md">
      <img
        src={court.image_thumb}
        alt="cart-image"
        className="w-30 max-h-25 rounded-md"
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <h6 className="text-[14px] text-main-theme">{court.court_name}</h6>
          <Button
            size="xs"
            variant="outline"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              remove(court.id);
            }}
          >
            {loading ? <Spinner /> : <TrashIcon className="text-red-600" />}
          </Button>
        </div>
        <p className="text-[13px]">{court.address}</p>
        <div className="flex text-[12px] justify-between w-full mt-1 items-center">
          <Accordion
            type="single"
            collapsible
            defaultValue="cart-bookedDate"
            className="max-w-lg mt-auto"
          >
            <AccordionItem value="cart-bookedDate">
              <AccordionTrigger className="text-[11px] py-0 px-1 ">
                Your booked date ({court.selectedDates.length})
              </AccordionTrigger>
              <AccordionContent className="">
                <ul className="list-disc px-5 ml-1">
                  {court.selectedDates.map((item, index) => {
                    return (
                      <li className="text-[11px] list-disc" key={index}>
                        {new Date(item.date).toLocaleDateString()} : {item.time}{" "}
                        WIB
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <p className="items-start self-start mt-3">
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
