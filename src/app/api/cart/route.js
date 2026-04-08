import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { Court } from "@/database/models/court";
import { isDate } from "date-fns";

export async function PUT(req) {
  // const isAuth = await authCheck(req);
  // if (!isAuth.email) return isAuth;

  // const { email } = isAuth;
  const court = await req.json();

  // const court = {
  //   id: "69a25acce547997cd53f5a13",
  //   selectedDate: "2026-03-28T10:51:14.376Z",
  //   selectedTime: "17-18",
  //   booked: true,
  // };

  try {
    await connectDB(mongoURI);

    let courtItem = await Court.findById(court.id);

    if (courtItem.booked_dates.length) {
      let isDateBooked = courtItem.booked_dates.filter((item) => {
        const dateFromDB = new Date(item.date).toISOString();
        const dateFromCart = new Date(court.selectedDate).toISOString();

        return dateFromDB == dateFromCart;
      });

      // if date exist

      if (isDateBooked.length) {
        let isTimeBooked = isDateBooked[0].times.filter(
          (item) => item.time == court.selectedTime
        );

        // if time already booked

        if (isTimeBooked.length) {
          return NextResponse.json(
            { success: false, message: "Schedule already booked" },
            { status: 400 }
          );
        } else {
          const target = await Court.findOne(
            { _id: court.id },
            {
              booked_dates: {
                $elemMatch: { date: new Date(isDateBooked[0].date) },
              },
            }
          );

          target.booked_dates[0].times.push({
            time: court.selectedTime,
            booked: true,
          });

          await target.save();
          return NextResponse.json(
            { success: true, message: "Successfully added to Cart" },
            { status: 201 }
          );
        }
      } else {
        await Court.updateOne(
          { _id: court.id },
          {
            $push: {
              booked_dates: {
                date: court.selectedDate,
                times: [
                  {
                    time: court.selectedTime,
                    booked: true,
                  },
                ],
              },
            },
          }
        );
        return NextResponse.json(
          { success: true, message: "Successfully added to Cart" },
          { status: 201 }
        );
      }
    }

    await Court.updateOne(
      { _id: court.id },
      {
        $push: {
          booked_dates: {
            date: court.selectedDate,
            times: [
              {
                time: court.selectedTime,
                booked: true,
              },
            ],
          },
        },
      }
    );

    return NextResponse.json(
      { success: true, message: "Successfully added to Cart" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
