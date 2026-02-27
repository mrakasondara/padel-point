import { Checkbox } from "@/components/ui/checkbox";
import { facilityItems } from "@/lib/facilities";

export const FacilitiesCheckbox = ({ facilities, handleChecked }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="" htmlFor="facilities">
        Facilities
      </label>
      <div className="grid grid-cols-2 gap-2">
        {facilityItems.map((facility) => {
          const Icon = facility.icon;
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
              />
              <Icon />
              <span>{facility.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
