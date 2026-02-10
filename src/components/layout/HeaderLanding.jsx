import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";
export const HeaderLanding = () => {
  return (
    <header className="flex mt-5 items-center">
      <Icon />
      <Button
        variant="outline"
        className="ml-auto bg-main-theme hover:bg-secondary-theme hover:text-main-theme cursor-pointer transition text-secondary-theme font-poppins text-[12px]"
        size="sm"
      >
        Sign In
      </Button>
    </header>
  );
};
