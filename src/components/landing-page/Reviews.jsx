import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "../ui/button";

export const Reviews = () => {
  return (
    <div
      className="flex flex-col lg:flex-row mt-[7rem] lg:px-[3rem] lg:justify-between lg:items-center"
      id="reviews"
    >
      <div className="flex flex-col text-center gap-3">
        <h3 className="text-4xl font-itim">
          From Our <span className="text-main-theme block">Community.</span>
        </h3>
        <p className="capitalize font-poppins font-semibold">
          Hear directly our satisfied community
        </p>
        <div className="flex mt-3 justify-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-5 py-6 cursor-pointer hover:bg-main-theme hover:text-secondary-theme transition-colors"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-5 py-6 cursor-pointer hover:bg-main-theme hover:text-secondary-theme transition-colors"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[8rem] lg:mt-0 lg:w-1/4 lg:mr-[2rem]">
        <p className="self-start">
          <Quote size="26px" />
        </p>
        <h4 className="font-poppins font-semibold text-center lg:text-start text-lg mt-1">
          Padel point has helped me to find & book comfy court
        </h4>
        <div className="lg:self-start flex mt-3">
          <img
            src="images/profile.jpg"
            alt="profile"
            className="w-[45px] rounded-full"
          />
          <div className="flex flex-col ml-3">
            <h6 className="text-[19px] text-main-theme font-itim">Jane Doe</h6>
            <p className="text-[13px]">Content Creator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
