"use client";
import { UsersDialog } from "@/components/admin/users/UsersDialog";
import { UsersList } from "@/components/admin/users/UsersList";

export default function Users() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">All Users</h3>
      <UsersDialog />
      <UsersList />
    </div>
  );
}
