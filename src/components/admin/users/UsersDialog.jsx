"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import adminPadelAPI from "@/lib/adminPadelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";
import { FormAddUser } from "./FormAddUser";

export const UsersDialog = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    city_address: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderChange = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };
  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await adminPadelAPI.addUsers(formData);
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
        await fetchUsers();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setIsLoading(false);
    }
  };

  const formProps = {
    onAddUser,
    formData,
    handleChange,
    handleGenderChange,
    handleRoleChange,
    isLoading,
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
        </DialogHeader>
        <FormAddUser props={formProps} />
      </DialogContent>
    </Dialog>
  );
};
