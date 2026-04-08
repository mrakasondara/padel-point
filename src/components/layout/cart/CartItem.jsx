import toRupiah from "@develoka/angka-rupiah-js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CartItem = ({ court }) => {
  return (
    <div className="flex gap-3 shadow p-2 rounded-md">
      <img
        src={court.image_thumb}
        alt="cart-image"
        className="w-30 max-h-25 rounded-md"
      />
      <div className="flex flex-col w-full">
        <h6 className=" text-[14px] text-main-theme">{court.court_name}</h6>
        <p className=" text-[13px]">{court.address}</p>
        <div className="flex text-[12px] justify-between w-full mt-1 items-center">
          <Accordion
            type="single"
            collapsible
            defaultValue="cart-bookedDate"
            className="max-w-lg "
          >
            <AccordionItem value="cart-bookedDate">
              <AccordionTrigger className="text-[11px]">
                Your booked date ({court.selectedDates.length})
              </AccordionTrigger>
              <AccordionContent className="mt-1">
                <ul className="list-disc">
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
