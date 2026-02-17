"use client";
import { useState } from "react";
import Link from "next/link";
import { easeInOut, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Icon } from "../layout/Icon";
import { errorStyle, successStyle } from "@/lib/toster-styles";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSignin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (response?.error) {
      toast.error("Email or password wrong!", { style: errorStyle });
    } else {
      toast.success("Login Success!", { style: successStyle });
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: easeInOut }}
      className="w-full flex flex-col justify-center items-center gap-5 mt-8"
      onSubmit={onSignin}
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
          required
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
          required
          placeholder="**********"
          className="rounded-sm text-sm"
          type="password"
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="ml-auto font-itim text-main-theme text-sm underline mt-1 cursor-pointer">
          Forgot password ?
        </p>
      </div>
      <Button
        type="submit"
        className="w-full md:w-3/4 lg:w-1/2 bg-main-theme text-secondary hover:text-main-theme hover:bg-transparent hover:shadow cursor-pointer hover:shadow shadow-main-theme transition-all"
      >
        {isLoading ? <Spinner /> : ""} Sign In
      </Button>
      <p className="font-itim">
        Does'nt have an account ?{" "}
        <Link
          href="/signup"
          className="text-main-theme cursor-pointer hover:underline"
        >
          Sign Up for free
        </Link>
      </p>
    </motion.form>
  );
};
