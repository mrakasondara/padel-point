import { ObjectId } from "mongodb";
import { model, Schema, models } from "mongoose";

const slotTimesSchema = new Schema({
  time: { type: String, required: true },
  booked: { type: Boolean, required: true },
});

const bookedDatesSchema = new Schema({
  date: { type: Date, required: true },
  times: [slotTimesSchema],
});

const commentsSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: {
        value: true,
        message: "User id shouldn`t empty ",
      },
    },
    comment: {
      type: String,
      required: {
        value: true,
        message: "Comment shouldn`t empty ",
      },
    },
    like: { type: Number },
    dislike: { type: Number },
  },
  { timestamps: true }
);

const courtSchema = new Schema({
  court_name: {
    type: String,
    required: {
      value: true,
      message: "Court name shouldn`t empty ",
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: "Description shouldn`t empty ",
    },
  },
  price: {
    type: Number,
    required: {
      value: true,
      message: "Price shouldn`t empty ",
    },
  },
  city: {
    type: String,
    required: {
      value: true,
      message: "City shouldn`t empty ",
    },
  },
  address: {
    type: String,
    required: {
      value: true,
      message: "Address shouldn`t empty ",
    },
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Object,
  },
  facilities: {
    type: Object,
  },
  image_thumb: {
    type: String,
  },
  booked_dates: [bookedDatesSchema],
  comments: [commentsSchema],
});

export const Court = models.Courts || model("Courts", courtSchema);
