"use client";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import adminPadelAPI from "@/lib/adminPadelAPI";
import { errorStyle, successStyle } from "@/lib/toster-styles";

export const UsersEditDialog = ({ user, fetchUsers }) => {
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState(user ? user.role : "user");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (value) => {
    setNewRole(value);
  };

  const onEditUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await adminPadelAPI.updateUserRole({
        id: user._id,
        role: newRole,
      });
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
        await fetchUsers();
        setOpen(false);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <SquarePen />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-start font-itim text-2xl text-main-theme">
            Edit user
          </DialogTitle>
          <DialogDescription className="text-start -mt-1">
            Edit user role here. click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2 text-start text-main-theme"
          onSubmit={onEditUser}
        >
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="full_name">
              Role
            </label>
            <Select
              onValueChange={handleRoleChange}
              defaultValue={user ? user.role : "user"}
              name="role"
              id="role"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full md:w-25 mt-3 ml-auto bg-main-theme text-white cursor-pointer hover:text-main-theme transition"
            variant="outline"
          >
            {isLoading ? <Spinner /> : ""} Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
