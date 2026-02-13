"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "../ui/button";

export const Reviews = () => {
  const [activeComment, setActiveComment] = useState(0);

  const reviewItems = [
    {
      comment:
        "This app makes it so easy to book a padel court without having to call manually. The schedule is clear and the payment process is fast.",
      name: "Rizky",
      job: "Software Engineer",
    },
    {
      comment:
        "The interface is simple and informative. I like the reminder feature before the match, so I never forget.",
      name: "Sinta",
      job: "Marketing Specialist",
    },
    {
      comment:
        "Prices and court availability are displayed transparently. Perfect for our community that often plays together.",
      name: "Andi",
      job: "Entrepreneur",
    },
    {
      comment:
        "Booking can be done in just a few clicks. Very helpful for busy people like me.",
      name: "Dewi",
      job: "Financial Analyst",
    },
    {
      comment:
        "I like the feature that shows reviews from other users. It helps me choose the best quality courts.",
      name: "Budi",
      job: "UI/UX Designer",
    },
  ];

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
            onClick={() => {
              if (!activeComment)
                return setActiveComment(reviewItems.length - 1);
              setActiveComment(activeComment - 1);
            }}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-5 py-6 cursor-pointer hover:bg-main-theme hover:text-secondary-theme transition-colors"
            onClick={() => {
              if (activeComment == reviewItems.length - 1)
                return setActiveComment(0);
              return setActiveComment(activeComment + 1);
            }}
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
          {reviewItems[activeComment]?.comment}
        </h4>
        <div className="lg:self-start flex mt-3">
          <img
            src="images/profile.jpg"
            alt="profile"
            className="w-[45px] rounded-full"
          />
          <div className="flex flex-col ml-3">
            <h6 className="text-[19px] text-main-theme font-itim">
              {reviewItems[activeComment]?.name}
            </h6>
            <p className="text-[13px]">{reviewItems[activeComment]?.job}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
