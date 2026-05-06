import { PaymentIcon } from "@/components/payment/PaymentIcon";
import { PaymentNavigation } from "@/components/payment/PaymentNavigation";

export const metadata = {
  title: "Payment Failed",
};

export default async function CheckoutFailed() {
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full h-full justify-center items-center gap-12">
      <div className="p-3 rounded-md bg-sidebar border flex flex-col text-center w-1/2 lg:w-1/4">
        <PaymentIcon success={false} />

        <div className="flex flex-col justify-center items-center gap-1 mt-3 px-2">
          <h1 className="text-2xl font-semibold text-red-500">
            Payment Failed!
          </h1>
          <p className="text-sm text-slate-500">
            An error occurred while processing your payment. Please try again.
          </p>
        </div>

        <PaymentNavigation />
      </div>
    </div>
  );
}
