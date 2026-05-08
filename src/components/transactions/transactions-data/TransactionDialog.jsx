import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const TransactionDialog = ({ transaction }) => {
  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        size="sm"
        className="ml-auto bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md p-2 transition-colors duration-300 ease-in-out text-[12px]"
      >
        Detail transaction
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md">PP/{transaction?._id}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
