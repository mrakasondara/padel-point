"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";
import { ToggleTheme } from "./ToggleTheme";

export const Header = () => {
  const activePath = usePathname();
  const { data } = useSession();
  return (
    <header
      className={`${
        activePath == "/signin" || activePath == "/signup" ? "hidden" : "flex"
      } mt-5 items-center mx-5`}
      id="header-landing"
    >
      <Icon id="icon-landing" />
      <div className="flex items-center ml-auto gap-2">
        <ToggleTheme id="toggle-landing" />

        {data ? (
          <Button
            variant="outline"
            className="bg-red-500/90 hover:bg-secondary-theme hover:text-red-500/90 dark:hover:text-constant cursor-pointer transition text-constant font-poppins text-[12px]"
            size="sm"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        ) : (
          ""
        )}

        {!data ? (
          <Link href="/signin">
            <Button
              variant="outline"
              className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins text-[12px]"
              size="sm"
            >
              Sign In
            </Button>
          </Link>
        ) : (
          ""
        )}

        {activePath == "/" && data ? (
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-constant font-poppins text-[12px]"
              size="sm"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
