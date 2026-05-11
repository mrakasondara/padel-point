import { connectDB } from "@/database";
import { authCheck } from "@/lib/auth";
import { mongoURI } from "../../../../../constant";
import { Transaction } from "@/database/models/transaction";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  const isAuth = await authCheck(req);
  if (!isAuth) return isAuth;

  const user_id = isAuth.sub;

  try {
    await connectDB(mongoURI);

    const transaction = await Transaction.findOne({ _id: id, user_id });

    return NextResponse.json(
      {
        success: true,
        message: "Transaction successfully fetched!",
        data: transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
        message: "Transaction fetched failed!",
      },
      { status: 400 }
    );
  }
}
