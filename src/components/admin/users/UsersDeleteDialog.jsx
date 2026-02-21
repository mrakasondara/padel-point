"use client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import adminPadelAPI from "@/lib/adminPadelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";
import { Spinner } from "@/components/ui/spinner";

export const UsersDeleteDialog = ({ id, fetchUsers }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await adminPadelAPI.deleteUser(id);
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
          <Trash />
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you absolutely sure? This action cannot be undone. This will
            permanently delete user from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            className="hover:bg-red-500 bg-accent text-red-500 dark:bg-input/30 dark:hover:bg-input/50 hover:text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
            onClick={onDeleteUser}
          >
            {isLoading ? <Spinner /> : ""} Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
