import { getCourtImage } from "@/supabase/storage/client";
import { NextResponse } from "next/server";
import { connectDB } from "@/database";
import { mongoURI } from "../../../../../constant";
import { Court } from "@/database/models/court";
import { User } from "@/database/models/user";
import { authCheck } from "@/lib/auth";

export async function GET(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 0;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);

    const user = await User.findById(user_id, "favorite_courts");

    let idCourts = [];

    user.favorite_courts.map((item) => {
      idCourts.push(item.court_id);
    });

    let courts = await Court.find(
      { _id: { $in: idCourts } },
      "image_thumb city court_name"
    ).limit(limit);

    for (const court of courts) {
      const { data, error } = await getCourtImage(court.image_thumb);
      if (error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
        );
      }
      court.image_thumb = data.publicUrl;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Courts favorites fetched successfully!",
        data: courts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
