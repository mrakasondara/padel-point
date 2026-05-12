import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { Court } from "@/database/models/court";

export async function GET(req) {
  try {
    await connectDB(mongoURI);

    const courtsAtJakarta = await Court.find(
      { city: { $regex: "jakarta", $options: "i" } },
      "court_name"
    );

    const courtsAtBandung = await Court.find(
      { city: { $regex: "bandung", $options: "i" } },
      "court_name"
    );

    const courtsAtBali = await Court.find(
      { city: { $regex: "bali", $options: "i" } },
      "court_name"
    );

    const courtsAtSurabaya = await Court.find(
      { city: { $regex: "surabaya", $options: "i" } },
      "court_name"
    );

    const data = [
      {
        city_name: "Jakarta",
        total_courts: courtsAtJakarta.length,
        image_thumb: "images/jakarta.jpg",
      },
      {
        city_name: "Bandung",
        total_courts: courtsAtBandung.length,
        image_thumb: "images/bandung.avif",
      },
      {
        city_name: "Bali",
        total_courts: courtsAtBali.length,
        image_thumb: "images/bali.jpg",
      },
      {
        city_name: "Surabaya",
        total_courts: courtsAtSurabaya.length,
        image_thumb: "images/surabaya.jpg",
      },
    ];

    return NextResponse.json(
      {
        success: true,
        message: "Courts statistic fetched successfully!",
        data,
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
