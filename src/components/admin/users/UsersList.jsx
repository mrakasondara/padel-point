"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Venus, Mars } from "lucide-react";
import { UsersDropdownActions } from "./UsersDropdownActions";

export const UsersList = ({ users, fetchUsers }) => {
  return (
    <Table className="mb-5">
      <TableCaption>
        A list of users.{" "}
        <span className="text-yellow-500">
          User access will be updated after logout
        </span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-main-theme font-semibold">
            Full Name
          </TableHead>
          <TableHead className="text-main-theme font-semibold">Email</TableHead>
          <TableHead className="text-main-theme font-semibold">
            Gender
          </TableHead>
          <TableHead className="text-main-theme font-semibold">Phone</TableHead>
          <TableHead className="text-main-theme font-semibold">
            City Address
          </TableHead>
          <TableHead className="text-main-theme font-semibold">Role</TableHead>
          <TableHead className="text-right text-main-theme font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => {
          return (
            <TableRow key={user?._id}>
              <TableCell>{user?.full_name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  {user?.gender == "female" ? (
                    <Venus size="17" />
                  ) : (
                    <Mars size="17" />
                  )}
                </div>
              </TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>{user?.city_address}</TableCell>
              <TableCell className="capitalize">{user?.role}</TableCell>
              <TableCell className="text-right">
                <UsersDropdownActions user={user} fetchUsers={fetchUsers} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
