import { connectDB } from "@/database";
import { mongoURI } from "../../../../../../../constant";
import { Court } from "@/database/models/court";
import { NextResponse } from "next/server";
import { authCheck } from "@/lib/auth";

export async function DELETE(req, { params }) {
  const { id, commentId } = await params;

  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);

    const isExist = await Court.findOne({
      _id: id,
      "comments._id": commentId,
      "comments.user_id": user_id,
    });

    if (isExist) {
      await Court.updateOne(
        {
          _id: id,
          "comments._id": commentId,
          "comments.user_id": user_id,
        },
        {
          $pull: { comments: { _id: commentId, user_id: user_id } },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Comment deleted successfully!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: "resource error",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
