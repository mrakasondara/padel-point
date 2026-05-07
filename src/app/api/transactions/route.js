import { NextResponse } from "next/server";
import { connectDB } from "../../../database";
import { authCheck } from "../../../lib/auth";
import { mongoURI } from "../../../../constant";
import { Transaction } from "@/database/models/transaction";
import { Court } from "@/database/models/court";
import { getCourtImage } from "@/supabase/storage/client";

export async function GET(req) {
  const isAuth = await authCheck(req);
  if (!isAuth) return isAuth;

  const user_id = isAuth.sub;
  const query = {};

  const { searchParams } = new URL(req.url);
  const transaction_status = searchParams.get("transaction_status");

  if (transaction_status) {
    query.transaction_status = transaction_status;
  }

  try {
    await connectDB(mongoURI);

    const transactions = await Transaction.find({
      user_id,
      ...query,
    });

    const transactionsWithImage = await Promise.all(
      transactions.map(async (transaction) => {
        const updatedTransaction = await Promise.all(
          transaction.courts.map(async (court) => {
            const courtData = await Court.findById(court.court_id);
            const { data, error } = await getCourtImage(courtData.image_thumb);
            if (error) {
              throw new Error("Something error");
            }
            return {
              ...court.toObject(),
              image_thumb: data.publicUrl,
            };
          })
        );
        return {
          ...transaction.toObject(),
          courts: updatedTransaction,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Transactions fetched successfully!",
        data: transactionsWithImage,
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
