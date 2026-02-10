export const ExploreItem = ({ city_name, total_court, image }) => {
  return (
    <div className="flex gap-5">
      <img
        src={image}
        alt={`img-${city_name}`}
        className="w-[110px] md:w-[120px] rounded-sm object-fit"
      />
      <div className="flex flex-col justify-center">
        <h5 className="text-main-theme font-itim md:text-lg">{city_name}</h5>
        <p className="font-poppins text-[11px] md:text-[13px]">
          {total_court} Court
        </p>
      </div>
    </div>
  );
};
