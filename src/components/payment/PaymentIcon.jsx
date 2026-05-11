import { Check, Clock, TimerOff, X } from "lucide-react";

export const PaymentIcon = ({ transaction_status = "pending" }) => {
  return (
    <>
      {transaction_status === "paid" && <SuccessIcon />}
      {transaction_status === "pending" && <PendingIcon />}
      {transaction_status === "failed" && <ErrorIcon />}
      {transaction_status === "expire" && <ExpireIcon />}
    </>
  );
};

const SuccessIcon = () => {
  return (
    <div className="w-17 mx-auto flex justify-center items-center mb-1 h-17 rounded-full bg-green-500/10">
      <div className="w-10 mb-1 h-10 flex justify-center items-center rounded-full border-3 border-green-500">
        <Check size="18px" className="text-green-500 font-semibold" />
      </div>
    </div>
  );
};

const PendingIcon = () => {
  return (
    <div className="w-17 mx-auto flex justify-center items-center mb-1 h-17 rounded-full bg-yellow-500/10">
      <div className="w-10 mb-1 h-10 flex justify-center items-center rounded-full border-3 border-yellow-500">
        <Clock size="18px" className="text-yellow-500 font-semibold" />
      </div>
    </div>
  );
};

const ErrorIcon = () => {
  return (
    <div className="w-17 mx-auto flex justify-center items-center mb-1 h-17 rounded-full bg-red-500/10">
      <div className="w-10 mb-1 h-10 flex justify-center items-center rounded-full border-3 border-red-500">
        <X size="18px" className="text-red-500 font-semibold" />
      </div>
    </div>
  );
};

const ExpireIcon = () => {
  return (
    <div className="w-17 mx-auto flex justify-center items-center mb-1 h-17 rounded-full bg-gray-500/10">
      <div className="w-10 mb-1 h-10 flex justify-center items-center rounded-full border-3 border-gray-500">
        <TimerOff size="18px" className="text-gray-500 font-semibold" />
      </div>
    </div>
  );
};
