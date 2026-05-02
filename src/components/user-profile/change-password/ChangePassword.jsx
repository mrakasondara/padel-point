"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { errorStyle, successStyle, warningStyle } from "@/lib/toster-styles";
import PadelApi from "@/lib/services/api/padelAPI";

export const ChangePassword = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword != confirmNewPassword) {
      return toast.warning("Password doesn't match!", { style: warningStyle });
    }

    const formData = { oldPassword, newPassword };

    try {
      setLoading(true);
      const response = await PadelApi.changePassword(formData);
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 500);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLoading(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="rounded-lg border w-full md:w-3/4 lg:w-1/2 p-3">
        <h2 className="text-foreground text-left align-middle font-medium whitespace-nowrap">
          Change Password
        </h2>
        <form
          className="w-full flex flex-col mt-3 gap-3"
          onSubmit={onChangePassword}
        >
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="old_password">
              Old Password
            </label>
            <Input
              id="old_password"
              name="old_password"
              type="password"
              placeholder="********"
              minLength="6"
              className="rounded-sm text-sm"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="new_password">
              New Password
            </label>
            <Input
              id="new_password"
              name="new_password"
              type="password"
              placeholder="********"
              minLength="6"
              className="rounded-sm text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="confirm_new_password">
              Confirm New Password
            </label>
            <Input
              id="confirm_new_password"
              name="confirm_new_password"
              type="password"
              placeholder="********"
              minLength="6"
              className="rounded-sm text-sm"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="ml-auto w-full md:w-1/4 bg-main-theme text-secondary dark:text-white hover:text-main-theme hover:bg-transparent cursor-pointer transition-all"
            variant="outline"
          >
            {loading ? <Spinner /> : ""}
            Save Update
          </Button>
        </form>
      </div>
    </div>
  );
};
