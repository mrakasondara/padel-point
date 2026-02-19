"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EllipsisVertical,
  ExternalLink,
  SquarePen,
  Trash,
  Venus,
  Mars,
} from "lucide-react";

export const UsersList = () => {
  return (
    <Table className="mb-5">
      <TableCaption>A list of users.</TableCaption>
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
          <TableHead className="text-right text-main-theme font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Doe</TableCell>
          <TableCell>janedoe@gmail.com</TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <Venus size="17" />
              Female
            </div>
          </TableCell>
          <TableCell>08213131</TableCell>
          <TableCell>West Jakarta</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-main-theme dark:text-constant cursor-pointer hover:bg-main-theme hover:text-secondary-theme transition-colors duration-300 ease-in-out"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <ExternalLink />
                    Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SquarePen />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
