import { CalendarBook } from "@/components/dashboard/court-detail/CalendarBook";
import { Comments } from "@/components/dashboard/court-detail/Comments";
import { Spinner } from "@/components/ui/spinner";
import adminPadelAPI from "@/lib/services/api/adminPadelAPI";
import { facilityItems } from "@/lib/facilities";
import { MapPinned, Star } from "lucide-react";
import { Suspense } from "react";

export default async function Page({ params }) {
  const { id } = await params;
  const response = await adminPadelAPI.getDetailCourt(id);
  const data = response.data;
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col p-5 mt-2 w-full md:w-3/4 lg:w-1/2  shadow dark:shadow-none rounded-lg mx-auto">
        <img
          src={data?.image_thumb}
          alt={data?.court_name}
          className="w-full rounded-lg"
        />

        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col w-full lg:w-3/4 mt-2 gap-2">
            <section className="flex flex-col gap-2 w-full">
              <h2 className="text-3xl font-itim text-main-theme">
                {data?.court_name}
              </h2>
              <div className="flex gap-2 items-center text-[14px]">
                <div className="flex gap-2 items-center">
                  <MapPinned size="13" />
                  <p>{data?.address}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center text-[14px]">
                <div className="flex items-center gap-1">
                  <Star size="14" className="text-main-theme" />
                  <span className="font-semibold">{data?.rating ?? "-"}</span>
                  Rating
                </div>
                <p>
                  <span className="font-semibold">{data?.reviews ?? "-"}</span>{" "}
                  Reviews
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-10 mt-10 w-full">
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-2xl font-itim text-main-theme">
                  Description
                </h3>
                <p className="text-[15px]">{data?.description}</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-2xl font-itim text-main-theme">
                  What this place offer
                </h3>
                <div className="grid grid-cols-2 p-3 gap-5">
                  {data?.facilities.map((facilityValue) => {
                    const facility = facilityItems.find(
                      (item) => item.name == facilityValue
                    );
                    if (!facility) return null;

                    const Icon = facility.icon;

                    return (
                      <div className="flex gap-2 items-center text-[13px]">
                        <Icon className="text-main-theme" />
                        <span>{facility.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <div className="grid mt-10 p-3 ">
            <CalendarBook />
          </div>
        </div>

        <section className="flex flex-col w-full mt-10">
          <Comments />
        </section>
      </div>
    </Suspense>
  );
}
