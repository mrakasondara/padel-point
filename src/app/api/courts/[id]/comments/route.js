import { NextResponse } from "next/server";
import { connectDB } from "@/database";
import { Court } from "@/database/models/court";
import { mongoURI } from "../../../../../../constant";
import { authCheck } from "@/lib/auth";
import { User } from "@/database/models/user";

export async function POST(req, { params }) {
  const { id } = await params;

  const isAuth = await authCheck(req);
  if (!isAuth.email) return isAuth;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);

    const comment = await req.json();

    await Court.updateOne(
      { _id: id },
      {
        $push: {
          comments: {
            user_id,
            comment,
          },
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Comments added successfully!",
      },
      { status: 201 }
    );
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

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectDB(mongoURI);

    const { comments } = await Court.findById(id, "comments").sort({
      createdAt: "desc",
    });

    const sortedComment = comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const commentsWithProfile = [];

    for (const comment of sortedComment) {
      const userProfile = await User.findById(comment.user_id);

      commentsWithProfile.push({
        ...comment._doc,
        email: userProfile?.email,
        fullName: userProfile?.full_name,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Comments fetched successfully!",
        data: commentsWithProfile,
      },
      { status: 200 }
    );
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
