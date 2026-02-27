import { connectDB } from "@/database";
import { mongoURI } from "../../../constant";
import { Court } from "@/database/models/court";
import { getCourtImage } from "@/supabase/storage/client";

class CourtServices {
  static async getCourts() {
    try {
      await connectDB(mongoURI);

      let courts = await Court.find({}, "-description -reviews -facilities");

      for (const court of courts) {
        const { data, error } = await getCourtImage(court.image_thumb);
        if (error) {
          return { success: false, message: error.message };
        }

        court.image_thumb = data.publicUrl;
      }

      return {
        success: true,
        message: "Courts fetched successfully!",
        data: courts,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  static async getCourtDetail(id) {
    try {
      await connectDB(mongoURI);

      let courts = await Court.findById(id);

      const { data, error } = await getCourtImage(court.image_thumb);

      if (error) {
        return { success: false, message: error.message };
      }

      courts.image_thumb = data.publicUrl;

      return {
        success: true,
        message: "Court fetched successfully!",
        data: courts,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default CourtServices;
