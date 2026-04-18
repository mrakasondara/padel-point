import { DashboardGreets } from "@/components/dashboard/DashboardGreets";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full gap-[3rem]">
      <DashboardGreets />
      <DashboardStats />
    </div>
  );
}
