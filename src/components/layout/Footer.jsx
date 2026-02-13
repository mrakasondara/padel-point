"use client";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Icon } from "./Icon";

export const Footer = () => {
  return (
    <footer className="flex text-white flex-col bg-main-theme dark:bg-bg py-10 px-6 md:px-15 mt-[8rem]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-lg md:text-xl font-itim">
            Navigation
          </p>
          <nav className="flex flex-col text-[12px] md:text-[13px] gap-1 font-poppins mt-2">
            <a href={"/#highlight"}>Higlight</a>
            <a href={"/#explore"}>Explore City</a>
            <a href={"/#reviews"}>Community Reviews</a>
          </nav>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-lg font-itim">Social Media</p>
          <div className="flex mt-2 gap-2">
            <Link href={"/"} className="border rounded-full p-1">
              <Instagram size="17px" />
            </Link>
            <Link href={"/"} className="border rounded-full p-1">
              <Facebook size="17px" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex mt-12 -mb-6 text-constant justify-between items-center text-[13px]">
        <Icon color="secondary" />
        <p>&copy; {new Date().getFullYear()} - PadelPoint</p>
      </div>
    </footer>
  );
};
