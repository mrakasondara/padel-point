"use client";

import toRupiah from "@develoka/angka-rupiah-js";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const BudgetFilter = ({ budget, setBudget }) => {
  return (
    <div className="flex flex-col w-full max-w-xs gap-3">
      <Label htmlFor="slider-demo-temperature">Budget</Label>
      <Slider
        id="slider-demo-temperature"
        value={budget}
        onValueChange={setBudget}
        min={0}
        max={1000000}
        step={10000}
      />
      <span className="flex justify-between text-[12px] text-muted-foreground">
        <span>{toRupiah(budget[0], { useUnit: true, floatingPoint: 0 })}</span>
        <span>{toRupiah(budget[1], { useUnit: true, floatingPoint: 0 })}</span>
      </span>
    </div>
  );
};
