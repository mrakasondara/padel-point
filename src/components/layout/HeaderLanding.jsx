import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";
import { ToggleTheme } from "./ToggleTheme";
export const HeaderLanding = () => {
  return (
    <header className="flex mt-5 items-center mx-5">
      <Icon />
      <div className="flex items-center ml-auto gap-2">
        <ToggleTheme />
        <Button
          variant="outline"
          className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-secondary-theme font-poppins text-[12px]"
          size="sm"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};
