import { ExploreItem } from "./ExploreItem";

export const Explore = () => {
  const exploreItems = [
    {
      id: 1,
      city_name: "Jakarta",
      total_court: 6,
      image: "images/jakarta.jpg",
    },
    {
      id: 2,
      city_name: "Bandung",
      total_court: 3,
      image: "images/bandung.avif",
    },
    {
      id: 3,
      city_name: "Surabaya",
      total_court: 4,
      image: "images/surabaya.jpg",
    },
    {
      id: 4,
      city_name: "Bali",
      total_court: 9,
      image: "images/bali.jpg",
    },
    {
      id: 5,
      city_name: "Maluku",
      total_court: 1,
      image: "images/bali.jpg",
    },
  ];
  return (
    <div className="flex flex-col gap-3 mt-16" id="explore">
      <h3 className="text-2xl text-main-theme font-itim">Explore City</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 gap-y-5 px-3 lg:px-[3rem]">
        {exploreItems.map((explore) => {
          return <ExploreItem {...explore} key={explore.id} />;
        })}
      </div>
    </div>
  );
};
