import { CourtItem } from "./CourtItem";

export const CourtsGrid = () => {
  const padelCourts = [
    {
      id: 1,
      court_name: "WePadl",
      city: "Jakarta",
      rate: 4,
      price: "150k",
      image_url: "images/courts/we-padl.jpg",
    },
    {
      id: 2,
      court_name: "PadelPoint",
      city: "Bandung",
      rate: 5,
      price: "200k",
      image_url: "images/courts/sky-padel.jpg",
    },
    {
      id: 3,
      court_name: "SmashArena",
      city: "Surabaya",
      rate: 3,
      price: "120k",
      image_url: "images/courts/o-garden.jpg",
    },
    {
      id: 4,
      court_name: "RacketHub",
      city: "Bali",
      rate: 4,
      price: "180k",
      image_url: "images/courts/manchester.webp",
    },
    {
      id: 5,
      court_name: "AceCourt",
      city: "Yogyakarta",
      rate: 5,
      price: "170k",
      image_url: "images/courts/major.jpg",
    },
    {
      id: 6,
      court_name: "TopSpin",
      city: "Medan",
      rate: 4,
      price: "160k",
      image_url: "images/courts/usa.jpg",
    },
    {
      id: 7,
      court_name: "NetPlay",
      city: "Semarang",
      rate: 3,
      price: "140k",
      image_url: "images/courts/jasper.jpg",
    },
    {
      id: 8,
      court_name: "CourtZone",
      city: "Makassar",
      rate: 5,
      price: "210k",
      image_url: "images/courts/campi.jpg",
    },
    {
      id: 9,
      court_name: "PadelHub",
      city: "Bogor",
      rate: 4,
      price: "155k",
      image_url: "images/courts/barnett.jpg",
    },
    {
      id: 10,
      court_name: "SpinCity",
      city: "Malang",
      rate: 5,
      price: "190k",
      image_url: "images/courts/usa.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 w-full">
      {padelCourts.map((court) => {
        return <CourtItem {...court} key={court.id} />;
      })}
    </div>
  );
};
