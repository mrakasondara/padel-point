import { BookedList } from "@/components/booked-courts/BookedList";

export const metadata = {
  title: "Booked Courts",
};

export default async function BookedPage() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full gap-[1rem]">
      <h1 className="text-xl text-main-theme font-bold">Your Booked Courts</h1>
      <BookedList />
    </div>
  );
}
