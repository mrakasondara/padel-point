import { NextResponse } from "next/server";
import { connectDB } from "@/database";
import { mongoURI } from "../../../../../constant";
import { Court } from "@/database/models/court";
import { getCourtImage } from "@/supabase/storage/client";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await connectDB(mongoURI);
    let court = await Court.findById(id);

    const { data, error } = await getCourtImage(court.image_thumb);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    court.image_thumb = data.publicUrl;
    return NextResponse.json(
      { success: true, message: "Court fetched successfully!", data: court },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
