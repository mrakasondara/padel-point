import { NextResponse } from "next/server";
import { connectDB } from "@/database";
import { mongoURI } from "../../../../../../constant";
import { authCheck } from "@/lib/auth";
import { User } from "@/database/models/user";

export async function POST(req, { params }) {
  const { id } = await params;

  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;
  const court_name = await req.json();

  try {
    await connectDB(mongoURI);

    // check if was in list favorite before
    const isFavorited = await User.findOne({
      _id: user_id,
      "favorite_courts.court_id": id,
    });

    if (isFavorited) {
      return NextResponse.json(
        {
          success: true,
          message: "Court already in favorites!",
        },
        { status: 200 }
      );
    } else {
      await User.updateOne(
        { _id: user_id },
        {
          $addToSet: {
            favorite_courts: {
              court_id: id,
              court_name,
            },
          },
        }
      );
      return NextResponse.json(
        {
          success: true,
          message: "Successfully added to favorites!",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
