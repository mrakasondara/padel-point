import { NextResponse } from "next/server";
import { authCheckIsAdmin } from "@/lib/auth";
import { mongoURI } from "../../../../../constant";
import { connectDB } from "@/database";
import { User } from "@/database/models/user";
import { Admin } from "@/database/models/admin";

export async function PUT(req, { params }) {
  const notAdmin = await authCheckIsAdmin(req);
  if (notAdmin) return notAdmin;

  const { id } = await params;
  const role = await req.text();
  try {
    await connectDB(mongoURI);
    const targetedUser = await User.findById(id, "email");
    const checkIsAdmin = await Admin.findOne({
      email: targetedUser.email,
    });

    if (checkIsAdmin) {
      if (checkIsAdmin.role == "admin") {
        await Admin.deleteOne({ email: targetedUser.email });
      }
    } else {
      await Admin.create({ email: targetedUser.email, role });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Users role successfully updated.",
        data: { email: targetedUser.email, role },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 401 }
    );
  }
}
