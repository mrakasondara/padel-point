import { model, Schema, models } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: "Email shouldn't empty",
      },
    },
    full_name: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Admin = models.Admins || model("Admins", adminSchema);
