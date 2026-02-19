"use client";
import { UsersDialog } from "@/components/admin/users/UsersDialog";
import { UsersList } from "@/components/admin/users/UsersList";
import { Loading } from "@/components/layout/Loading";
import adminPadelAPI from "@/lib/adminPadelAPI";
import { errorStyle } from "@/lib/toster-styles";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Users() {
  const { data } = useSession();
  if (data?.user.role != "superadmin") {
    redirect("/dashboard", RedirectType.replace);
  }

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await adminPadelAPI.getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error(response?.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error, { style: errorStyle });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full">
      <h3 className="text-2xl text-main-theme font-itim">All Users</h3>
      {isLoading ? (
        <div className="mt-[3rem]">
          <Loading message={"Fetching users..."} />
        </div>
      ) : (
        <>
          <UsersDialog fetchUsers={fetchUsers} />
          <UsersList users={users} />
        </>
      )}
    </div>
  );
}
