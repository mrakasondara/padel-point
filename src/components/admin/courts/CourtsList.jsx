"use client";
import Link from "next/link";
import toRupiah from "@develoka/angka-rupiah-js";
import { EllipsisVertical, ExternalLink, SquarePen, Trash } from "lucide-react";

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

export const CourtsList = ({ data }) => {
  return (
    <Table className="mb-5">
      <TableCaption>
        {data?.length ? "A list of courts." : "You didn`t have any court"}
      </TableCaption>
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
      {data?.length ? (
        <TableBody>
          {data?.map((court) => {
            return (
              <TableRow key={court._id}>
                <TableCell>{court.court_name}</TableCell>
                <TableCell>
                  {toRupiah(court.price, { useUnit: true, floatingPoint: 0 })}
                  /hour
                </TableCell>
                <TableCell>{court.city}</TableCell>
                <TableCell>{court.address}</TableCell>
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
                        <Link href={`/court/${court._id}`}>
                          <DropdownMenuItem>
                            <ExternalLink />
                            Detail
                          </DropdownMenuItem>
                        </Link>
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
            );
          })}
        </TableBody>
      ) : (
        ""
      )}
    </Table>
  );
};
