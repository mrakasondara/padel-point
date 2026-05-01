"use client";

import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PadelApi from "@/lib/services/api/padelAPI";
import { errorStyle, successStyle } from "@/lib/toster-styles";
import { Loading } from "@/components/layout/Loading";

export const FormUpdate = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");

  const fetchUserData = async () => {
    try {
      setInitialLoading(true);
      const response = await PadelApi.getPersonalInformation();
      if (response?.success) {
        setFullName(response.data?.full_name ?? "");
        setEmail(response.data?.email ?? "");
        setCityAddress(response.data?.city_address ?? "");
        setGender(response.data?.gender ?? "");
        setPhone(response.data?.phone ?? "");
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleRadioChange = (value) => {
    setGender(value);
  };

  const onUpdateUser = async (e) => {
    e.preventDefault();
    const formData = {
      full_name: fullName,
      email,
      city_address: cityAddress,
      gender,
      phone,
    };
    try {
      setLoading(true);
      const response = await PadelApi.updatePersonalInformation(formData);
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
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {initialLoading ? (
        <Loading message="Loading..." />
      ) : (
        <form
          className="flex flex-col gap-2 text-start text-main-theme w-full lg:max-w-150 bg-sidebar p-4 rounded-md"
          onSubmit={onUpdateUser}
        >
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="full_name">
              Full Name
            </label>
            <Input
              id="full_name"
              name="full_name"
              className="rounded-sm text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              className="rounded-sm text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="city">
              City Address
            </label>
            <Input
              id="city"
              name="city"
              className="rounded-sm text-sm"
              value={cityAddress}
              onChange={(e) => setCityAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="gender">
              Gender
            </label>
            <RadioGroup
              defaultValue={gender}
              className="w-fit text-[14px] ml-5"
              onValueChange={handleRadioChange}
              required
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="male" id="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="female" id="female" />
                <label htmlFor="female">Female</label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-1">
            <label className="" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex flex-row py-1">
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                defaultCountry="ID"
                numberInputProps={{
                  className: "border rounded-sm p-1 text-sm",
                }}
              />
            </div>
          </div>

          <Button
            className="ml-auto w-full md:w-1/4 bg-main-theme text-secondary hover:text-main-theme hover:bg-transparent cursor-pointer transition-all"
            variant="outline"
          >
            {loading ? <Spinner /> : ""}
            Save Update
          </Button>
        </form>
      )}
    </>
  );
};
