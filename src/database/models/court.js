import { model, Schema, models } from "mongoose";

const slotTimesSchema = new Schema({
  time: { type: String, required: true },
  booked: { type: Boolean, required: true },
});

const bookedDatesSchema = new Schema({
  date: { type: Date, required: true },
  times: [slotTimesSchema],
});

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
});

export const Court = models.Courts || model("Courts", courtSchema);

booked_dates: [
  {
    date: "09-11-2025",
    times: [
      {
        time: "10-11",
        booked: true,
      },
    ],
  },
];
