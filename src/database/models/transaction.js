import { ObjectId } from "mongodb";
import { model, Schema, models } from "mongoose";

const timesSchema = new Schema({
  time: { type: String, required: true },
});
const bookedDatesSchema = new Schema({
  date: { type: Date, required: true },
  times: [timesSchema],
});
const courtSchema = new Schema({
  court_id: {
    type: ObjectId,
    required: {
      value: true,
      message: "Court id shouldn't empty",
    },
  },
  court_name: { type: String },
  booked_dates: [bookedDatesSchema],
  total_payment: Number,
});

const transactionSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: {
        value: true,
        message: "User id shouldn't empty",
      },
    },
    courts: [courtSchema],
    total_payment: {
      type: Number,
      required: {
        value: true,
        message: "Total payment shouldn't empty",
      },
    },
    invoice_number: {
      type: String,
    },
    payment_date: {
      type: String,
    },
    transaction_status: {
      type: String,
      required: {
        value: true,
        message: "Transaction status shouldn't empty",
      },
      enum: ["pending", "paid", "failed", "expired"],
      default: "pending",
    },
    transaction_midtrans_id: {
      type: String,
    },
    transaction_time: {
      type: String,
    },
    merchant_id: {
      type: String,
    },
    payment_type: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction =
  models.Transactions || model("Transactions", transactionSchema);
