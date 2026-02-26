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

// const dummy = [
//   {
//     court_name: "Padel Arena Medan",
//     description: "Lapangan indoor dengan rumput sintetis premium",
//     price: "120000",
//     city: "Medan",
//     address: "Jl. Gatot Subroto No.12, Medan",
//   },
//   {
//     court_name: "Smash Padel Court",
//     description: "Lapangan padel standar internasional",
//     price: "150000",
//     city: "Jakarta",
//     address: "Jl. Sudirman No.45, Jakarta",
//   },
//   {
//     court_name: "Padel Hub Bandung",
//     description: "Lapangan outdoor dengan pencahayaan malam",
//     price: "100000",
//     city: "Bandung",
//     address: "Jl. Dago Atas No.21, Bandung",
//   },
//   {
//     court_name: "Ace Padel Center",
//     description: "Fasilitas lengkap dengan area lounge",
//     price: "130000",
//     city: "Surabaya",
//     address: "Jl. Darmo Permai No.8, Surabaya",
//   },
//   {
//     court_name: "Victory Padel Court",
//     description: "Lapangan semi indoor nyaman",
//     price: "110000",
//     city: "Yogyakarta",
//     address: "Jl. Kaliurang Km 5, Yogyakarta",
//   },
//   {
//     court_name: "Green Padel Arena",
//     description: "Lapangan eco-friendly dengan ventilasi alami",
//     price: "90000",
//     city: "Bogor",
//     address: "Jl. Pajajaran No.10, Bogor",
//   },
//   {
//     court_name: "Pro Padel Club",
//     description: "Lapangan kompetisi turnamen",
//     price: "160000",
//     city: "Bali",
//     address: "Jl. Sunset Road No.99, Denpasar",
//   },
//   {
//     court_name: "Urban Padel Space",
//     description: "Lapangan modern di pusat kota",
//     price: "140000",
//     city: "Makassar",
//     address: "Jl. Pettarani No.33, Makassar",
//   },
//   {
//     court_name: "Elite Padel Court",
//     description: "Lapangan eksklusif dengan tribun penonton",
//     price: "170000",
//     city: "Semarang",
//     address: "Jl. Pandanaran No.50, Semarang",
//   },
//   {
//     court_name: "Champion Padel Arena",
//     description: "Lapangan training dan coaching padel",
//     price: "125000",
//     city: "Palembang",
//     address: "Jl. Basuki Rahmat No.77, Palembang",
//   },
// ];
