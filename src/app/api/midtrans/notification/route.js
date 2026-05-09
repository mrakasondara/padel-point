import crypto from "crypto";
import { connectDB } from "@/database";
import { mongoURI } from "../../../../../constant";
import { Transaction } from "@/database/models/transaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    transaction_time,
    payment_type,
    merchant_id,
    transaction_id,
    va_numbers,
  } = body;

  const getPaymentMethod = (paymentType) => {
    if (paymentType === "echannel") {
      return "Mandiri Bank";
    } else if (paymentType === "bank_transfer") {
      const bankName = va_numbers?.[0]?.bank;
      return bankName ? `${bankName} Bank` : "Bank Transfer";
    } else {
      return paymentType;
    }
  };

  try {
    const hash = crypto
      .createHash("sha512")
      .update(
        order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (hash !== signature_key) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 500 }
      );
    }

    await connectDB(mongoURI);

    switch (transaction_status) {
      case "settlement":
        const formatPaymentType = getPaymentMethod(payment_type);
        await Transaction.updateOne(
          { _id: order_id },
          {
            transaction_status: "paid",
            transaction_midtrans_id: transaction_id,
            transaction_time,
            merchant_id,
            payment_type: formatPaymentType,
          }
        );
        return NextResponse.json(
          { success: true, message: "Payment success" },
          { status: 200 }
        );
      case "pending":
        await Transaction.updateOne(
          { _id: order_id },
          {
            transaction_status: "pending",
            payment_type,
          }
        );
        return NextResponse.json(
          { success: true, message: "Payment pending" },
          { status: 200 }
        );
      case "expire":
        await Transaction.updateOne(
          { _id: order_id },
          {
            transaction_status: "expire",
            payment_type,
          }
        );
        return NextResponse.json(
          { success: true, message: "Payment expire" },
          { status: 400 }
        );
      case "failed":
        await Transaction.updateOne(
          { _id: order_id },
          {
            transaction_status: "failed",
            payment_type,
          }
        );
        return NextResponse.json(
          { success: true, message: "Payment failed" },
          { status: 400 }
        );
      default:
        await Transaction.updateOne(
          { _id: order_id },
          {
            transaction_status: "pending",
            payment_type,
          }
        );
        return NextResponse.json(
          { success: true, message: "ok" },
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
