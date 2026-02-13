export const Icon = ({ color = "main" }) => {
  return (
    <div className="flex gap-1 items-center">
      <img src="icons/padel.png" className="w-6.25" />
      <h1
        className={`font-itim text-xl ${
          color == "main" ? "text-main-theme" : "text-constant"
        }`}
      >
        PadelPoint
      </h1>
    </div>
  );
};
