import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Field, FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export const ImageDialog = ({ isHovering, onClick }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            className={`absolute ${
              isHovering ? "flex items-center justify-center" : "hidden"
            } top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 z-10`}
            onClick={onClick}
          >
            <Pencil className="text-white" size="30px" />
          </div>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Edit Image Profile</DialogTitle>
            <DialogDescription>
              Make changes to your image profile here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="image">Image</Label>
              <Input type="file" id="image" className="text-sm" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
