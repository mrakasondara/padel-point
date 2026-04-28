"use client";

import { ImageProfile } from "./ImageProfile";

export const ProfileHeader = ({ user }) => {
  return (
    <div className="flex flex-col gap-1">
      <ImageProfile user={user} />
      <h2 className="text-xl font-medium mt-1">{user?.fullName}</h2>
      <p className="text-md text-slate-500">{user?.email}</p>
    </div>
  );
};
