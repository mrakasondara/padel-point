"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FacilitiesCheckbox } from "./FacilitiesCheckbox";
import adminPadelAPI from "@/lib/adminPadelAPI";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";

export const CourtsDialog = () => {
  const [formData, setFormData] = useState({
    court_name: "",
    description: "",
    price: 0,
    city: "",
    address: "",
  });
  const [facilities, setFacilities] = useState([]);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChecked = (value) => {
    setFacilities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item != value)
        : [...prev, value]
    );
  };

  const onAddCourt = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.set("court_name", formData.court_name);
    data.set("description", formData.description);
    data.set("price", formData.price);
    data.set("city", formData.city);
    data.set("address", formData.address);
    data.set("facilities", facilities);
    data.set("image_thumb", image);

    try {
      setIsLoading(true);
      const response = await adminPadelAPI.addCourt(data);
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
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
    <Dialog>
      <DialogTrigger
        className="mt-3 w-30 ml-auto bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
        variant="outline"
      >
        Add courts
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-start font-itim text-2xl text-main-theme">
            Add new court
          </DialogTitle>
          <DialogDescription className="text-start -mt-1">
            Add new court here. click save when you're done.
          </DialogDescription>
          <form
            className="flex flex-col gap-2 text-start text-main-theme"
            onSubmit={onAddCourt}
          >
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="court_name">
                Court Name
              </label>
              <Input
                id="court_name"
                name="court_name"
                placeholder="PadelPoint Arena"
                value={formData.court_name}
                onChange={handleChange}
                className="rounded-sm text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="rounded-sm text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="" htmlFor="price">
                Price
              </label>
              <Input
                id="price"
                name="price"
                placeholder="Price/hr"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="rounded-sm text-sm"
                required
              />
              <span className="text-[11px] text-yellow-500">price/hour</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="city">
                City
              </label>
              <Input
                id="city"
                name="city"
                placeholder="Jakarta"
                value={formData.city}
                onChange={handleChange}
                className="rounded-sm text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="address">
                Address
              </label>
              <Input
                id="address"
                name="address"
                placeholder="West Jakarta"
                value={formData.address}
                onChange={handleChange}
                className="rounded-sm text-sm"
                required
              />
            </div>

            <FacilitiesCheckbox
              facilities={facilities}
              handleChecked={handleChecked}
            />

            <div className="flex flex-col gap-1">
              <label className="" htmlFor="image">
                Image
              </label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="rounded-sm text-sm"
                required
              />
            </div>
            <Button
              className="w-full md:w-25 mt-3 ml-auto bg-main-theme text-white cursor-pointer hover:text-main-theme transition"
              variant="outline"
            >
              {isLoading ? <Spinner /> : ""}
              Save
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
