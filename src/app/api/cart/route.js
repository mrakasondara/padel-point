import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { Court } from "@/database/models/court";
import { Transaction } from "@/database/models/transaction";

export async function POST(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;

  const courts = await req.json();

  const newCourts = Object.values(
    courts.reduce((acc, item) => {
      const { id, selectedDate, selectedTime, price } = item;

      if (!acc[id]) {
        acc[id] = {
          court_id: id,
          booked_dates: [],
          total_payment: price,
        };
      } else {
        acc[id].total_payment += price;
      }

      // cek apakah tanggal sudah ada
      const existingDate = acc[id].booked_dates.find(
        (court) =>
          new Date(court.date).toISOString() ===
          new Date(selectedDate).toISOString()
      );

      if (existingDate) {
        existingDate.times.push({ time: selectedTime });
      } else {
        acc[id].booked_dates.push({
          date: new Date(selectedDate).toISOString(),
          times: [{ time: selectedTime }],
        });
      }

      return acc;
    }, {})
  );

  const totalPayment = newCourts.reduce(
    (acc, cur) => acc + cur.total_payment,
    0
  );

  const transactionData = {
    user_id,
    courts: newCourts,
    total_payment: totalPayment,
    payment_status: "paid",
    transaction_status: "pending",
  };

  await Transaction.create(transactionData);

  return NextResponse.json(
    { success: true, message: "Checkout success" },
    { status: 201 }
  );
}

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
