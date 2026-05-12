export const ExploreItem = ({ city_name, total_courts, image_thumb }) => {
  return (
    <div className="flex gap-5">
      <img
        src={image_thumb}
        alt={`img-${city_name}`}
        className="w-[70px] md:w-[120px] rounded-sm object-fit"
      />
      <div className="flex flex-col justify-center">
        <h5 className="text-main-theme font-itim md:text-lg">{city_name}</h5>
        <p className="font-poppins text-[11px] md:text-[13px]">
          {total_courts} Court
        </p>
      </div>
    </div>
  );
};
