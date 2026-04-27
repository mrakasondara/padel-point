import { Checkbox } from "@/components/ui/checkbox";
import { facilityItems } from "@/lib/facilities";

export const FacilitiesFilter = ({ facilities, handleChecked }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px] font-semibold" htmlFor="facilities">
        Facilities
      </label>
      <div className="grid grid-cols-1 gap-2 mt-1">
        {facilityItems.map((facility) => {
          return (
            <div
              className="flex gap-2 items-center text-[13px]"
              key={facility.name}
            >
              <Checkbox
                checked={facilities.includes(facility.name)}
                onCheckedChange={(e) => handleChecked(facility.name)}
                id={facility.name}
                name={facility.name}
                className="focus:ring-1 focus:ring-main-theme"
              />
              <span>{facility.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
