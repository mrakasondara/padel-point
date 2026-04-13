import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { Court } from "@/database/models/court";

export async function PUT(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const court = await req.json();

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

export async function DELETE(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const courts = await req.json();
  try {
    await connectDB(mongoURI);
    for (const court of courts) {
      const target = await Court.findOne(
        { _id: court.id },
        {
          booked_dates: {
            $elemMatch: { date: new Date(court.selectedDate).toISOString() },
          },
        }
      );

      const bookedDatesData = target.booked_dates[0];

      // get selected time index
      const index = bookedDatesData.times.findIndex(
        (item) => item.time === court.selectedTime
      );
      bookedDatesData.times.splice(index, 1);
      await target.save();

      if (!bookedDatesData.times.length) {
        // get booked_date index
        const target = await Court.findOne({ _id: court.id });
        const targetedBookedDates = target.booked_dates;
        const index = targetedBookedDates.findIndex(
          (item) => item.date == court.selectedDate
        );
        target.booked_dates.splice(index, 1);
        await target.save();
      }
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Cart been successfully emptied" },
    { status: 200 }
  );
}
