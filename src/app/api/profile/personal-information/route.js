import { NextResponse } from "next/server";
import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";

export async function GET(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);
    const user = await User.findById(
      user_id,
      "-password -favorite_courts -image_thumb"
    );
    return NextResponse.json(
      {
        success: true,
        message: "User personal information fetched!",
        data: user,
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
