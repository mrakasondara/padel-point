"use client";

import { useEffect, useMemo, useState } from "react";
import { id } from "date-fns/locale";
import toRupiah from "@develoka/angka-rupiah-js";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock2Icon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/services/store";
import { timesOptions } from "@/lib/time-options";
import { toast } from "sonner";
import { successStyle, warningStyle, errorStyle } from "@/lib/toster-styles";
import PadelApi from "@/lib/services/api/padelAPI";
import { Spinner } from "@/components/ui/spinner";

export const CalendarBook = ({ court, fetch }) => {
  const { cart, addToCart } = useStore();

  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [bookedDates, setBookedDates] = useState(court?.booked_dates ?? []);

  let fullyBookedDates = new Date(
    bookedDates
      ?.filter((item) => item.times.length === timesOptions.length)
      .map((item) => item.date)
  );

  const availableTimes = useMemo(() => {
    const timeBySelectedDate = bookedDates?.find(
      (bookedDate) => bookedDate.date == new Date(selectedDate).toISOString()
    );

    if (!timeBySelectedDate) return;

    return timeBySelectedDate.times;
  }, [selectedDate]);

  const onAddToCart = async (e) => {
    e.preventDefault();

    const courtAddToCart = {
      id: court._id,
      court_name: court.court_name,
      image_thumb: court.image_thumb,
      selectedDate: selectedDate.toString(),
      selectedTime,
      address: court.address,
      price: court.price,
    };

    if (!selectedTime) {
      return toast.warning("Chose booked time first", { style: warningStyle });
    }

    const timeBySelectedDate = bookedDates?.find(
      (bookedDate) => bookedDate.date == new Date(selectedDate).toISOString()
    );

    try {
      setIsLoading(true);
      const response = await PadelApi.addToCart(courtAddToCart);

      if (response?.success) {
        toast.success(response.message, {
          style: successStyle,
        });
        addToCart(courtAddToCart);
        fetch();
      } else {
        toast.error(response.message, {
          style: errorStyle,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: errorStyle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <Card size="sm" className="w-fit mx-auto md:mx-0">
      <CardContent>
        <Calendar
          key={1}
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="p-0"
          disabled={fullyBookedDates}
          locale={id}
          modifiers={{
            booked: fullyBookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </CardContent>
      <CardFooter className="bg-card border-t">
        <form className="flex flex-col gap-2 w-full" onSubmit={onAddToCart}>
          <p className="text-sm">Pick Time</p>
          <Select
            value={selectedTime}
            onValueChange={(value) => setSelectedTime(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {!availableTimes
                  ? timesOptions.map((item, index) => (
                      <SelectItem value={item} key={index}>
                        <Clock2Icon />
                        {item} WIB
                      </SelectItem>
                    ))
                  : timesOptions
                      .filter(
                        (item1) =>
                          !availableTimes.some((item2) => item2.time === item1)
                      )
                      .map((time, index) => (
                        <SelectItem value={time} key={index}>
                          <Clock2Icon />
                          {time} WIB
                        </SelectItem>
                      ))}
                {availableTimes?.map((time, index) => (
                  <SelectItem
                    value={time.time}
                    key={index}
                    disabled={time.booked ? true : false}
                  >
                    <Clock2Icon />
                    {time.time} WIB
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col mt-1 items-center">
            <p className="text-sm text-main-theme">
              {toRupiah(court.price, { dot: ",", floatingPoint: 0 })}
            </p>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
            >
              {isLoading ? <Spinner /> : <ShoppingCart />}
              Add to cart
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
