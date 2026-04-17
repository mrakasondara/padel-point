import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../../../../constant";
import { Court } from "@/database/models/court";
import { authCheck } from "@/lib/auth";

export async function PUT(req, { params }) {
  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const userId = isAuth.sub;
  const email = isAuth.email;

  const { id, commentId } = await params;

  try {
    await connectDB(mongoURI);

    const court = await Court.findOne({
      _id: id,
      "comments._id": commentId,
      "comments.likes.user_id": userId,
    });

    // check is comment disliked before

    const disliked = await Court.findOne({
      _id: id,
      "comments._id": commentId,
      "comments.dislikes.user_id": userId,
    });

    if (disliked) {
      await Court.updateOne(
        {
          _id: id,
          "comments._id": commentId,
        },
        { $pull: { "comments.$.dislikes": { user_id: userId, email } } }
      );
    }

    if (court) {
      await Court.updateOne(
        {
          _id: id,
          "comments._id": commentId,
        },
        { $pull: { "comments.$.likes": { user_id: userId, email } } }
      );
      return NextResponse.json(
        { success: true, message: "Comment unliked" },
        { status: 200 }
      );
    } else {
      await Court.updateOne(
        {
          _id: id,
          "comments._id": commentId,
        },
        { $addToSet: { "comments.$.likes": { user_id: userId, email } } }
      );
      return NextResponse.json(
        { success: true, message: "Comment liked" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Comment liked failed" },
      { status: 400 }
    );
  }
}
