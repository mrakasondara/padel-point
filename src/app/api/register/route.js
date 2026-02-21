import { connectDB } from "@/database";
import { User } from "@/database/models/user";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { encryptPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const userData = await req.json();
    const { email, password } = userData;

    await connectDB(mongoURI);

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return NextResponse.json(
        { success: false, message: "Email has been registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await encryptPassword(password);

    await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { success: true, message: "User Register Successfully", data: email },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "User Register Failed" },
      { status: 400 }
    );
  }
}
