"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { EllipsisVertical, ExternalLink, SquarePen, Trash } from "lucide-react";

export const CourtsList = () => {
  return (
    <Table className="mb-5">
      <TableCaption>A list of courts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-main-theme font-semibold">
            Court Name
          </TableHead>
          <TableHead className="text-main-theme font-semibold">Price</TableHead>
          <TableHead className="text-main-theme font-semibold">City</TableHead>
          <TableHead className="text-main-theme font-semibold">
            Full Address
          </TableHead>
          <TableHead className="text-right text-main-theme font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>WePadl</TableCell>
          <TableCell>550k/hr</TableCell>
          <TableCell>Jakarta</TableCell>
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
