import { checkIsAdmin, connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { Admin } from "@/database/models/admin";

export async function GET(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unaturhorized Access" },
      { status: 401 }
    );
  }
  const { email } = token;
  const isAdmin = await checkIsAdmin({ url: mongoURI, email });

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unaturhorized Access" },
      { status: 401 }
    );
  }

  try {
    await connectDB(mongoURI);
    let users = await User.find({}, "-password").lean();

    for (const user of users) {
      const isAdmin = await Admin.find({ email: user.email });
      user.role = isAdmin.length ? isAdmin[0].role : "user";
    }

    return NextResponse.json(
      {
        success: true,
        message: "Users successfully fetched.",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
