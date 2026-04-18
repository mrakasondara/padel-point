import mongoose from "mongoose";
import { Admin } from "./models/admin";
import { mongoURI } from "../../constant";
import { Court } from "./models/court";

export const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url);
    console.log(`mongodb connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const checkIsAdmin = async ({ url, email }) => {
  try {
    await mongoose.connect(url);
    const admin = await Admin.findOne({ email });
    if (admin) return true;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const getCourtTitle = async (id) => {
  try {
    await connectDB(mongoURI);
    const court = await Court.findOne({ _id: id }, "court_name");
    return court.court_name;
  } catch (error) {
    console.error(`Error : ${error}`);
  }
};
