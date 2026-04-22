import { connectDB } from "@/database";
import { mongoURI } from "../../../../../constant";
import { authCheck } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Transaction } from "@/database/models/transaction";
import { getCourtImage } from "@/supabase/storage/client";
import { Court } from "@/database/models/court";

export async function GET(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 0;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);
    const transactions = await Transaction.find(
      {
        user_id,
        payment_status: "paid",
      },
      "courts payment_status"
    ).limit(limit);

    const courts = transactions.map((transaction) => transaction.courts);
    const flatData = courts.flat();

    let mergedCourts = Object.values(
      flatData.reduce((acc, item) => {
        const key = item.court_id.toString();
        if (!acc[key]) {
          acc[key] = {
            court_id: item.court_id,
            booked_dates: [],
          };
        }

        acc[key].booked_dates.push(...item.booked_dates);

        return acc;
      }, {})
    );

    for (const court of mergedCourts) {
      const { image_thumb, court_name } = await Court.findById(court.court_id);
      const { data, error } = await getCourtImage(image_thumb);
      if (error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
        );
      }
      court.image_thumb = data.publicUrl;
      court.court_name = court_name;
    }

    const data = { courts: mergedCourts.splice(0, limit), payment: "paid" };

    return NextResponse.json(
      { success: true, data, message: "Transactions fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
