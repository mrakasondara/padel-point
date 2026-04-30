"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import PadelApi from "@/lib/services/api/padelAPI";
import { Edit } from "lucide-react";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const PersonalInformation = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await PadelApi.getPersonalInformation();
      if (response?.success) {
        setUserData(response.data);
        console.log(userData);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-lg border w-full md:w-3/4 lg:w-1/2 px-2">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Personal Information</TableHead>
              <TableHead className="text-end text-main-theme underline">
                <Link
                  href="/dashboard/profile/personal-information"
                  className="flex ml-auto w-1/2 md:w-1/4 items-center gap-1 justify-end"
                >
                  <Edit size="14px" /> Edit data
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-37.5">Full name:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  userData?.full_name ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">Email:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  userData?.email ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">City Address:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  userData?.city_address ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">Gender:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  userData?.gender ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">Phone:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  userData?.phone ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">Member Since:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  new Intl.DateTimeFormat("en-US", options).format(
                    new Date(userData?.createdAt ?? 0)
                  ) ?? "-"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-37.5">Last Updated:</TableCell>
              <TableCell className="font-medium">
                {loading ? (
                  <Skeleton className="w-40 rounded-xs h-2" />
                ) : (
                  new Intl.DateTimeFormat("en-US", options).format(
                    new Date(userData?.updatedAt ?? 0)
                  ) ?? "-"
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
