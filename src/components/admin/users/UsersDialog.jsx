"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const UsersDialog = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    gender: "",
    phone: "",
    city_address: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddUser = async (e) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger
        className="mt-3 w-30 ml-auto bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
        variant="outline"
      >
        Add users
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-start font-itim text-2xl text-main-theme">
            Add new user
          </DialogTitle>
          <DialogDescription className="text-start -mt-1">
            Add new user here. click save when you're done.
          </DialogDescription>
          <form
            className="flex flex-col gap-2 text-start text-main-theme"
            onSubmit={onAddUser}
          >
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="full_name">
                Full Name
              </label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="Jane Doe"
                value={formData.full_name}
                onChange={handleChange}
                className="rounded-sm text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="email@site.co"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-sm text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="gender">
                Gender
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="phone">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="0812"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-sm text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="" htmlFor="city_address">
                City Address
              </label>
              <Input
                id="city_address"
                name="city_address"
                placeholder="West Jakarta"
                value={formData.city_address}
                onChange={handleChange}
                className="rounded-sm text-sm"
              />
            </div>

            <Button
              className="w-full md:w-25 mt-3 ml-auto bg-main-theme text-white cursor-pointer hover:text-main-theme transition"
              variant="outline"
            >
              Save
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
