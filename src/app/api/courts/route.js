import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { Court } from "@/database/models/court";
import { addCourtImage, getCourtImage } from "@/supabase/storage/client";
import { authCheckIsAdmin } from "@/lib/auth";

export async function POST(req) {
  const notAdmin = await authCheckIsAdmin(req);
  if (notAdmin) return notAdmin;

  const body = await req.formData();
  let courtData = Object.fromEntries(body);

  try {
    await connectDB(mongoURI);

    const fileName = courtData.image_thumb.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);

    const facilities = courtData.facilities.split(",");
    const image_thumb = fileName;

    const newCourt = await Court.create({
      ...courtData,
      facilities,
      image_thumb,
    });

    const newImage = `${newCourt._id}.${fileExtension}`;
    const path = `courts/${newImage}`;

    const { data, error } = await addCourtImage({
      path,
      file: courtData.image_thumb,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    await Court.updateOne({ _id: newCourt._id }, { image_thumb: newImage });

    return NextResponse.json(
      { success: true, message: "Court added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB(mongoURI);

    let courts = await Court.find({}, "-description -reviews -facilities");

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
      { success: true, message: "Courts fetched successfully!", data: courts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}