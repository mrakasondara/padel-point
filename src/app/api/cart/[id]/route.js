import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { mongoURI } from "../../../../../constant";
import { Court } from "@/database/models/court";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const { id } = await params;

  const courts = await req.json();
  try {
    await connectDB(mongoURI);
    for (const court of courts) {
      const target = await Court.findOne(
        { _id: id },
        {
          booked_dates: {
            $elemMatch: { date: new Date(court.selectedDate).toISOString() },
          },
        }
      );
      const bookedDatesData = target.booked_dates[0];
      const index = bookedDatesData.times.findIndex(
        (item) => item.time == court.selectedTime
      );
      bookedDatesData.times.splice(index, 1);

      await target.save();

      if (!bookedDatesData.times.length) {
        // get booked_date index
        const target = await Court.findOne({ _id: id });
        const targetedBookedDates = target.booked_dates;
        const index = targetedBookedDates.findIndex(
          (item) => item.date == court.selectedDate
        );
        target.booked_dates.splice(index, 1);
        await target.save();
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { success: true, message: "Court been successfully remove" },
    { status: 200 }
  );
}
