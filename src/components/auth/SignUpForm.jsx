"use client";
import { useState } from "react";
import { motion, easeInOut } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "../layout/Icon";
import PadelApi from "@/lib/padelAPI";
import { errorStyle, successStyle, warningStyle } from "@/lib/toster-styles";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    if (password != confirmPassword)
      return toast.warning("Password not match!", {
        style: warningStyle,
      });
    const userData = { email, password };

    setIsLoading(true);
    const response = await PadelApi.register(userData);
    setIsLoading(false);

    if (response.success) {
      toast.success(response.message, {
        style: successStyle,
      });
      setTimeout(() => {
        router.push("/signin");
      }, 700);
    } else {
      toast.error(response.message, { style: errorStyle });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: easeInOut }}
      className="w-full flex flex-col justify-center items-center gap-5 mt-8"
      onSubmit={onSignup}
    >
      <div className="flex flex-col gap-1">
        <div className="absolute block md:hidden top-2 -left-1">
          <Icon color="main" />
        </div>
        <h2 className="font-itim text-4xl text-center text-main-theme">
          Hey There!
        </h2>
        <p className="text-center text-sm">Join the Game, Own the Court.</p>
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-1">
        <label htmlFor="email" className="text-main-theme font-semibold">
          Email
        </label>
        <Input
          id="email"
          placeholder="janedoe@site.co"
          className="rounded-sm text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-1">
        <label
          htmlFor="confirm-password"
          className="text-main-theme font-semibold"
        >
          Confirm Password
        </label>
        <Input
          id="confirm-password"
          placeholder="**********"
          className="rounded-sm text-sm"
          type="password"
          minLength="6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full md:w-3/4 lg:w-1/2 bg-main-theme text-secondary hover:text-main-theme hover:bg-transparent hover:shadow cursor-pointer transition-all"
      >
        {isLoading ? <Spinner /> : ""}
        Sign Up
      </Button>
      <p className="font-itim">
        Already have an account ?{" "}
        <Link
          href="/signin"
          className="text-main-theme cursor-pointer hover:underline"
        >
          Sign In
        </Link>
      </p>
    </motion.form>
  );
};
