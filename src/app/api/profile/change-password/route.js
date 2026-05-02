import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/database";
import { authCheck, encryptPassword } from "@/lib/auth";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";

export async function PUT(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;
  const { oldPassword, newPassword } = await req.json();
  try {
    await connectDB(mongoURI);
    const userData = await User.findById(user_id, "password");

    // check oldPassword correct
    const isMatched = await bcrypt.compare(oldPassword, userData.password);

    if (!isMatched) {
      throw new Error("Old password wrong");
    } else {
      const hashedNewPassword = await encryptPassword(newPassword);

      await User.updateOne({ _id: user_id }, { password: hashedNewPassword });

      return NextResponse.json(
        { success: true, message: "Password updated successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
