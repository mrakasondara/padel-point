import mongoose from "mongoose";
import { Admin } from "./models/admin";

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
