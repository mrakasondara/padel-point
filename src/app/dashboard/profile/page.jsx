import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfileHeader } from "@/components/user-profile/profile-header/ProfileHeader";

export const metadata = {
  title: "User Profile",
};

export default async function ProfilePage() {
  const data = await getServerSession(authOptions);

  return (
    <div className="flex flex-col px-12 py-5 mt-2 w-full gap-[1rem]">
      <ProfileHeader user={data?.user} />
    </div>
  );
}
