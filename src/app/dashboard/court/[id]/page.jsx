import { CalendarBook } from "@/components/dashboard/court-detail/CalendarBook";
import { Comments } from "@/components/dashboard/court-detail/Comments";
import {
  Building2,
  EvCharger,
  Hamburger,
  MapPinned,
  SquareParking,
  Star,
  Toilet,
  Wifi,
} from "lucide-react";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="flex flex-col p-5 mt-2 w-full md:w-3/4 lg:w-1/2  shadow dark:shadow-none rounded-lg mx-auto">
      <img
        src="/images/courts/major.jpg"
        alt="court"
        className="w-full rounded-lg"
      />

      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full lg:w-3/4 mt-2 gap-2">
          <section className="flex flex-col gap-2 w-full">
            <h2 className="text-3xl font-itim text-main-theme">
              Major Padel Court
            </h2>
            <div className="flex gap-2 items-center text-[14px]">
              <div className="flex gap-2 items-center">
                <MapPinned size="13" />
                <p>West Jakarta, Jakarta, Indonesia</p>
              </div>
            </div>
            <div className="flex gap-2 items-center text-[14px]">
              <div className="flex items-center gap-1">
                <Star size="14" color="#1d1a63" />
                <span className="font-semibold">4.8</span>Rating
              </div>
              <p>
                <span className="font-semibold">14</span> Reviews
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-10 mt-10 w-full">
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-2xl font-itim text-main-theme">
                Description
              </h3>
              <p className="text-[15px]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis, odio? Dicta doloribus sequi itaque accusantium
                accusamus a natus, ratione eum!
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-2xl font-itim text-main-theme">
                What this place offer
              </h3>
              <div className="grid grid-cols-2 p-3 gap-5">
                <div className="flex gap-2 items-center text-[13px]">
                  <Hamburger color="#1d1a63" />
                  <span>Cafe</span>
                </div>
                <div className="flex gap-2 items-center text-[13px]">
                  <Wifi color="#1d1a63" />
                  <span>Wifi</span>
                </div>
                <div className="flex gap-2 items-center text-[13px]">
                  <EvCharger color="#1d1a63" />
                  <span>Ev Charger</span>
                </div>
                <div className="flex gap-2 items-center text-[13px]">
                  <SquareParking color="#1d1a63" />
                  <span>Free Parking</span>
                </div>
                <div className="flex gap-2 items-center text-[13px]">
                  <Toilet color="#1d1a63" />
                  <span>Toilet</span>
                </div>
                <div className="flex gap-2 items-center text-[13px]">
                  <Building2 color="#1d1a63" />
                  <span>Prayer Room</span>
                </div>
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
  );
}
