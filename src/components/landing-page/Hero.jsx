export const Hero = () => {
  return (
    <div className="flex w-full h-80 md:h-130 mt-8 relative justify-center items-center">
      <img
        src="images/hero.webp"
        className="h-full md:w-full lg:w-3/4 rounded-lg object-cover absolute top-0 z-5"
      />
      <div className="flex flex-col text-center w-3/4 gap-1 text-secondary-theme z-5">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
          Book Your Court. <br />
          Play Without Limits.
        </h2>
        <p className="text-sm md:text-md">
          Book your favorite padel about in second.
        </p>
      </div>
    </div>
  );
};
