export const Higlight = () => {
  return (
    <div className="flex gap-x-3 lg:gap-x-5 mt-16 h-81.25 md:h-95.5 lg:w-3/4 lg:mx-auto md:justify-center mb-5 ">
      <div className="rounded-lg flex flex-col justify-end relative w-1/2 md:w-[30%] lg:w-[25%] overflow-hidden">
        <img
          src="images/we-padl.jpg"
          alt="we-padl"
          className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
        />
        <div className="flex flex-col p-3 z-5 text-secondary-theme bg-black/30">
          <h4 className="text-[19px] font-itim">WePadl</h4>
          <h4 className="text-[13px] z-5 font-poppins">350k/hr</h4>
        </div>
      </div>
      <div className="flex flex-col w-1/2 md:w-[40%] lg:w-[30%] gap-2">
        <div className="flex flex-col rounded-lg relative w-full h-1/2 justify-end">
          <img
            src="images/sky-padel.jpg"
            alt="we-padl"
            className="absolute object-cover bg-red-300 top-0 z-5 rounded-lg h-full w-125"
          />
          <div className="flex flex-col p-3 z-5 text-secondary-theme rounded-b-lg bg-black/30">
            <h4 className="text-[19px] font-itim">WePadl</h4>
            <h4 className="text-[13px] z-5 font-poppins">350k/hr</h4>
          </div>
        </div>
        <div className="flex flex-col justify-end rounded-lg relative h-1/2">
          <img
            src="images/o-garden.jpg"
            alt="we-padl"
            className="absolute object-cover top-0 z-5 rounded-lg h-full w-125"
          />
          <div className="flex flex-col p-3 z-5 text-secondary-theme rounded-b-lg bg-black/30">
            <h4 className="text-[19px] font-itim">WePadl</h4>
            <h4 className="text-[13px] z-5 font-poppins">350k/hr</h4>
          </div>
        </div>
      </div>
      <div className="md:flex flex-col justify-end hidden rounded-lg relative md:w-[30%] lg:w-[25%] h-full overflow-hidden">
        <img
          src="images/we-padl.jpg"
          alt="we-padl"
          className="absolute object-cover top-0 z-5 rounded-lg w-full h-full"
        />
        <div className="flex flex-col p-3 z-5 text-secondary-theme bg-black/30">
          <h4 className="text-[19px] font-itim">WePadl</h4>
          <h4 className="text-[13px] z-5 font-poppins">350k/hr</h4>
        </div>
      </div>
    </div>
  );
};
