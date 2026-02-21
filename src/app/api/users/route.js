import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
import { Admin } from "@/database/models/admin";
import { authCheckIsAdmin, encryptPassword } from "@/lib/auth";

export async function GET(req) {
  const notAdmin = await authCheckIsAdmin(req);
  if (notAdmin) return notAdmin;

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

export async function POST(req) {
  const auth = await authCheckIsAdmin(req);
  if (auth) return auth;

  try {
    await connectDB(mongoURI);

    const { full_name, email, password, gender, phone, city_address, role } =
      await req.json();

    const isEmailExist = await User.findOne({ email }, "email");

    if (isEmailExist) {
      return NextResponse.json(
        { success: false, message: "Email has been registered" },
        { status: 400 }
      );
    }

    if (role == "admin") {
      await Admin.create({ email, full_name, role });
    }

    const hashedPassword = await encryptPassword(password);

    await User.create({
      full_name,
      email,
      password: hashedPassword,
      gender,
      phone,
      city_address,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Users successfully added.",
        data: { email, role },
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
