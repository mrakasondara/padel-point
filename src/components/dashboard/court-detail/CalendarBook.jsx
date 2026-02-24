"use client";

import { useEffect, useMemo, useState } from "react";
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

export const CalendarBook = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );
  const [selectedTime, setSelectedTime] = useState("");

  const court = {
    id: "09121212",
    price: "110.000",
    bookedDates: [
      {
        date: "Sat Feb 28 2026 00:00:00 GMT+0700 (Western Indonesia Time)",
        times: [
          {
            time: "08-09",
            booked: true,
          },
          {
            time: "09-10",
            booked: true,
          },
          {
            time: "11-12",
            booked: true,
          },
          {
            time: "13-14",
            booked: true,
          },
        ],
      },
      {
        date: "Fri Feb 27 2026 00:00:00 GMT+0700 (Western Indonesia Time)",
        times: [
          {
            time: "08-09",
            booked: false,
          },
          {
            time: "09-10",
            booked: false,
          },
          {
            time: "11-12",
            booked: true,
          },
          {
            time: "13-14",
            booked: true,
          },
        ],
      },
    ],
  };

  let fullyBookedDates = new Date(
    court.bookedDates
      .filter((item) => item.times.every((time) => time.booked == true))
      .map((item) => item.date)
  );

  const availableTimes = useMemo(() => {
    const timeBySelectedDate = court.bookedDates.find(
      (bookedDate) => bookedDate.date == selectedDate
    );

    if (!timeBySelectedDate) return;

    return timeBySelectedDate.times;
  }, [selectedDate]);

  const onAddToCart = (e) => {
    e.preventDefault();
    const courtAddToCart = {
      id: court.id,
      selectedDate: selectedDate.toString(),
      selectedTime,
      price: court.price,
    };
    console.log(courtAddToCart);
  };

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
              {!availableTimes ? (
                <SelectGroup>
                  <SelectItem value="08-10">
                    <Clock2Icon />
                    08-10 WIB
                  </SelectItem>
                  <SelectItem value="10-11">
                    <Clock2Icon />
                    10-11 WIB
                  </SelectItem>
                  <SelectItem value="12-13">
                    <Clock2Icon />
                    12-13 WIB
                  </SelectItem>
                  <SelectItem value="14-15">
                    <Clock2Icon />
                    14-15 WIB
                  </SelectItem>
                </SelectGroup>
              ) : (
                availableTimes.map((time, index) => (
                  <SelectGroup>
                    <SelectItem
                      value={time.time}
                      key={index}
                      disabled={time.booked ? true : false}
                    >
                      <Clock2Icon />
                      {time.time} WIB
                    </SelectItem>
                  </SelectGroup>
                ))
              )}
            </SelectContent>
          </Select>
          <div className="flex flex-col mt-1 items-center">
            <p className="text-sm text-main-theme">Rp. 110.000</p>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
            >
              <ShoppingCart />
              Add to cart
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
