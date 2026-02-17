import { model, Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: "Email shouldn't empty",
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: "Password shouldn't empty",
      },
    },
    full_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    city_address: {
      type: String,
    },
    image_thumb: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models.Users || model("Users", userSchema);
