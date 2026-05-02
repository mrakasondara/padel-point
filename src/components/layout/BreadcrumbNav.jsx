"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadcrumbNav = () => {
  const path = usePathname();
  const splitPath = path.split("/");
  splitPath.splice(0, 1);
  return (
    <Breadcrumb className="px-5 mt-2 pb-3">
      <BreadcrumbList>
        {splitPath.map((item, index) => {
          const href =
            item === "dashboard"
              ? "/dashboard"
              : `/${splitPath.slice(0, index + 1).join("/")}`;
          const title = item.includes("-") ? item.split("-").join(" ") : item;
          console.log(title);
          const titleCase = title[0].toUpperCase() + title.slice(1);
          {
            return splitPath.length - 1 === index ? (
              <div key={index}>
                <BreadcrumbItem>
                  <BreadcrumbPage href={href}>{titleCase}</BreadcrumbPage>
                </BreadcrumbItem>
              </div>
            ) : (
              <div key={index} className="flex items-center gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{titleCase}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
