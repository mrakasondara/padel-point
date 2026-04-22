import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const BookedItem = ({
  court_id,
  court_name,
  booked_dates,
  image_thumb,
}) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const sortedDates = booked_dates.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Card className="relative w-full max-w-sm pt-0 rounded-lg">
      <div className="absolute inset-0 z-30 aspect-video rounded-t-lg" />
      <img
        src={image_thumb}
        alt="Court image"
        className="relative z-20 aspect-video w-full object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardAction>
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            Paid
          </Badge>
        </CardAction>
        <CardTitle className="text-main-theme">{court_name}</CardTitle>
        <CardDescription>
          {sortedDates.map((item) => {
            return (
              <Accordion
                type="single"
                collapsible
                defaultValue="cart-bookedDate"
                className="max-w-lg my-1"
                key={item._id}
              >
                <AccordionItem value="cart-bookedDate">
                  <AccordionTrigger className="text-[12px] p-0">
                    {new Intl.DateTimeFormat("en-US", options).format(
                      new Date(item.date)
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <ul className="list-disc px-5 ml-1">
                      {item.times.map((item, index) => {
                        return (
                          <li className="text-[11px] list-disc" key={index}>
                            {item.time} WIB
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
