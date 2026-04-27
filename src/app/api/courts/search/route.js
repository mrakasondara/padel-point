import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { Court } from "@/database/models/court";
import { getCourtImage } from "@/supabase/storage/client";

export async function POST(req) {
  const query = {};

  const { searchParams } = new URL(req.url);

  const courtName = searchParams.get("court_name");
  const facilitiesQuery = searchParams.get("facilities");
  const minBudget = searchParams.get("min_budget");
  const maxBudget = searchParams.get("max_budget");

  if (courtName) {
    query.court_name = { $regex: courtName, $options: "i" };
  }
  if (facilitiesQuery) {
    query.facilities = { $all: facilitiesQuery.split(",") };
  }
  if (minBudget || maxBudget) {
    query.price = {};
    if (minBudget) query.price.$gte = Number(minBudget);
    if (maxBudget) query.price.$lte = Number(maxBudget);
  }

  try {
    await connectDB(mongoURI);

    let courts = await Court.find(query);

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
        message: "Courts fetched successfully!",
        data: courts,
        total: courts.length,
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
