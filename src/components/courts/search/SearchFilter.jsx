"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacilitiesFilter } from "./FacilitiesFilter";
import { BudgetFilter } from "./BudgetFilter";
import { buildQuery } from "@/lib/services/api/padelAPI";
import { useRouter } from "next/navigation";

export const SearchFilter = () => {
  const router = useRouter();

  const [facilities, setFacilities] = useState([]);
  const [courtName, setCourtName] = useState("");
  const [budget, setBudget] = useState([50000, 150000]);
  const [loading, setLoading] = useState(false);

  const handleChecked = (value) => {
    setFacilities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item != value)
        : [...prev, value]
    );
  };

  const filterCourts = (e) => {
    e.preventDefault();
    const query = buildQuery({
      facilities,
      court_name: courtName,
      min_budget: budget[0],
      max_budget: budget[1],
    });

    router.push(`/court/search?${query}`);
  };
  return (
    <div className="w-full py-8 px-5 rounded-md md:w-[40%] lg:w-[30%] bg-sidebar self-start shadow-md flex flex-col gap-3">
      <h1 className="text-lg font-semibold text-main-theme">Court Discovery</h1>
      <form onSubmit={filterCourts} className="flex flex-col gap-5">
        <Input
          type="search"
          placeholder="Search court"
          className="w-3/4 md:w-full rounded-sm text-sm"
          value={courtName}
          onChange={(e) => setCourtName(e.target.value)}
        />
        <h6 className="text-[16px] font-semibold mt-8">Filters</h6>
        <BudgetFilter budget={budget} setBudget={setBudget} />
        <FacilitiesFilter
          facilities={facilities}
          handleChecked={handleChecked}
        />
        <Button
          type="submit"
          className="w-full md:w-3/4 lg:w-1/2 bg-main-theme text-secondary hover:text-main-theme hover:bg-transparent hover:shadow cursor-pointer hover:shadow shadow-main-theme transition-all"
        >
          Filter
        </Button>
      </form>
    </div>
  );
};
