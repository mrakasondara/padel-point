"use client";
import { motion, easeInOut } from "motion/react";

export const SideImage = ({ page }) => {
  return (
    <motion.div
      initial={{ left: -30, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easeInOut }}
      className="hidden md:flex flex-col relative w-1/2 h-full rounded-lg"
    >
      <img
        src="images/courts/jasper.jpg"
        alt="image"
        className="absolute w-full -z-1 h-full object-cover rounded-lg"
      />
      <div className="flex flex-col m-8 text-white h-full">
        <h1 className="text-3xl font-itim">PadelPoint</h1>
        <div className="w-1/2 flex flex-col mt-auto text-md">
          {page == "signin" ? (
            <>
              <p>Sign in and step onto the court,</p>
              <p>Pick your perfect date and time,</p>
              <p>Secure your spot with easy payment,</p>
              <p>Play, relax, and enjoy every match.</p>
            </>
          ) : (
            <>
              <p>Create your account and join the game,</p>
              <p>Book courts anytime, anywhere,</p>
              <p>Customize your schedule with ease,</p>
              <p>Experience padel like never before.</p>
            </>
          )}
          <hr className="w-3/4 mt-2" />
        </div>
      </div>
    </motion.div>
  );
};
