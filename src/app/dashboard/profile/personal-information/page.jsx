import { FormUpdate } from "@/components/user-profile/personal-information/FormUpdate";

export const metadata = {
  title: "Personal Information",
};

export default async function PersonalInformation() {
  return (
    <div className="flex flex-col px-12 py-5 mt-2 w-full gap-5">
      <h1 className="text-xl font-semibold text-main-theme">
        Update Personal Information
      </h1>
      <FormUpdate />
    </div>
  );
}
