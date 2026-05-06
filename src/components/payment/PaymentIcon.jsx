import { Check, X } from "lucide-react";

export const PaymentIcon = ({ success }) => {
  return (
    <div
      className={`w-17 mx-auto flex justify-center items-center mb-1 h-17 rounded-full ${
        success ? "bg-green-500/10" : "bg-red-500/10"
      } `}
    >
      <div
        className={`w-10 mb-1 h-10 flex justify-center items-center rounded-full border-3 ${
          success ? "border-green-500" : "border-red-500"
        } `}
      >
        {success ? (
          <Check size="18px" className="text-green-500 font-semibold" />
        ) : (
          <X size="18px" className="text-red-500 font-semibold" />
        )}
      </div>
    </div>
  );
};
