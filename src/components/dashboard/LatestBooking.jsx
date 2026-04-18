import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const DashboardLatestBooking = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-main-theme">
          Latest Booking Courts
        </h2>
        <Link href="/dashboard/booked" className="text-main-theme text-sm">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 md:px-3 w-full pt-5">
        <LatestItem />
        <LatestItem />
        <LatestItem />
      </div>
    </div>
  );
};

const LatestItem = () => {
  return (
    <Card className="relative w-full max-w-sm pt-0 rounded-lg">
      <div className="absolute inset-0 z-30 aspect-video rounded-t-lg" />
      <img
        src="/images/courts/jasper.jpg"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardAction>
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            Paid
          </Badge>
        </CardAction>
        <CardTitle className="text-main-theme">Padel Hub</CardTitle>
        <CardDescription>
          Jakarta, 14 April 2025 - 15:00 - 17:00 WIB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
