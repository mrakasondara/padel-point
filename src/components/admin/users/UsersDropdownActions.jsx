import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ExternalLink } from "lucide-react";
import { UsersEditDialog } from "./UsersEditDialog";
import { UsersDeleteDialog } from "./UsersDeleteDialog";

export const UsersDropdownActions = ({ user, fetchUsers }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-main-theme dark:text-constant cursor-pointer hover:bg-main-theme hover:text-secondary-theme transition-colors duration-300 ease-in-out"
          disabled={user?.role == "superadmin" ? true : false}
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ExternalLink />
            Detail
          </DropdownMenuItem>
          <UsersEditDialog user={user} fetchUsers={fetchUsers} />
          <UsersDeleteDialog id={user?._id} fetchUsers={fetchUsers} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
