"use client";
import { motion, easeInOut } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "../layout/Icon";

export const SignInForm = () => {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: easeInOut }}
      className="w-full flex flex-col justify-center items-center gap-5 mt-8"
    >
      <div className="flex flex-col gap-1">
        <div className="absolute block md:hidden top-2 -left-1">
          <Icon color="main" />
        </div>
        <h2 className="font-itim text-4xl text-center text-main-theme">
          Welcome Back!
        </h2>
        <p className="text-center text-sm">Step In, Play On.</p>
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-1">
        <label htmlFor="email" className="text-main-theme font-semibold">
          Email
        </label>
        <Input
          id="email"
          placeholder="janedoe@site.co"
          className="rounded-sm text-sm"
        />
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-1">
        <label htmlFor="password" className="text-main-theme font-semibold">
          Password
        </label>
        <Input
          id="password"
          placeholder="**********"
          className="rounded-sm text-sm"
          type="password"
        />
        <p className="ml-auto font-itim text-main-theme text-sm underline mt-1 cursor-pointer">
          Forgot password ?
        </p>
      </div>
      <Button
        type="submit"
        className="w-full md:w-3/4 lg:w-1/2 bg-main-theme text-secondary hover:text-main-theme hover:bg-transparent hover:shadow cursor-pointer transition-all"
      >
        Sign In
      </Button>
      <p className="font-itim">
        Does'nt have an account ?{" "}
        <span className="text-main-theme cursor-pointer">Sign Up for free</span>
      </p>
    </motion.form>
  );
};
