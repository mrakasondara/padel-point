import { model, Schema, models } from "mongoose";

const timesSchema = new Schema({
  time: { type: String, required: true },
});
const bookedDatesSchema = new Schema({
  date: { type: Date, required: true },
  times: [timesSchema],
});

const transactionSchema = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      required: {
        value: true,
        message: "User id shouldn't empty",
      },
    },
    court_id: {
      type: Schema.ObjectId,
      required: {
        value: true,
        message: "Court id shouldn't empty",
      },
    },
    booked_dates: [bookedDatesSchema],
    total_payment: {
      type: Number,
      required: {
        value: true,
        message: "Total payment shouldn't empty",
      },
    },
    payment_status: {
      type: String,
      required: {
        value: true,
        message: "Payment status shouldn't empty",
      },
      enum: ["pending", "paid", "failed", "expired"],
      default: "pending",
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
        message: "Payment status shouldn't empty",
      },
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Transaction =
  models.Transactions || model("Transactions", transactionSchema);
