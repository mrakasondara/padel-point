import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Field, FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarImage } from "../../ui/avatar";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";
import { Spinner } from "@/components/ui/spinner";

export const ImageDialog = ({ oldImage, isHovering, onClick }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState(oldImage ?? "");
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("image_thumb", image);

    try {
      setLoading(true);
      const response = await PadelApi.updateImageProfile(data);
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
        e.target.reset();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLoading(false);
    }
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImagePrev("/images/profile/placeholder.png");
      console.log(e.target.files);
      return;
    }
    setImagePrev(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  useEffect(() => setImage(image), [image]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`absolute ${
            isHovering ? "flex items-center justify-center" : "hidden"
          } top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 z-10`}
          onClick={() => {
            onClick;
            setOpen(true);
          }}
        >
          <Pencil className="text-white" size="30px" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Image Profile</DialogTitle>
          <DialogDescription>
            Make changes to your image profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2 text-start text-main-theme"
          onSubmit={onFormSubmit}
        >
          <FieldGroup className="flex flex-col items-center gap-3">
            <Avatar className={"w-40 h-auto"}>
              <AvatarImage
                src={imagePrev ? imagePrev : "/images/profile/guest.webp"}
                alt="profile"
              />
            </Avatar>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                className="text-sm"
                accept="image/*"
                onChange={(e) => onSelectFile(e)}
                required
              />
              <span className="text-[11px] text-yellow-600 -mt-2">
                Image profile will be updated after logout
              </span>
            </Field>
          </FieldGroup>
          <Button
            type="submit"
            variant="outline"
            className="ml-auto bg-main-theme text-secondary dark:text-white hover:text-main-theme hover:bg-transparent cursor-pointer transition-all"
          >
            {loading && <Spinner />}
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
