import { model, Schema, models } from "mongoose";

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
});

export const Court = models.Courts || model("Courts", courtSchema);
