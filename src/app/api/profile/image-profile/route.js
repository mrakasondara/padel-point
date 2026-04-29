import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { updateUserImageProfile } from "@/supabase/storage/client";

export async function PUT(req) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);

    const formData = await req.formData();
    const { image_thumb } = Object.fromEntries(formData.entries());

    // check if user have image profile
    const user = await User.findById(user_id, "image_thumb");

    const fileName = image_thumb.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const newImage = `${user_id}.${fileExtension}`;
    const path = `users/${newImage}`;

    const { data, error } = await updateUserImageProfile({
      path,
      file: image_thumb,
      oldImage: user.image_thumb,
    });

    if (error) {
      return new Error("Profile image update failed");
    }

    await User.updateOne({ _id: user_id }, { image_thumb: newImage });

    return NextResponse.json(
      { success: true, message: "Image profile updated!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, message: error.message },
      { status: 400 }
    );
  }
}
