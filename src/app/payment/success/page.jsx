import { PaymentContent } from "@/components/payment/PaymentContent";

export const metadata = {
  title: "Payment Notification",
};

export default async function CheckoutSuccess({ searchParams }) {
  const { order_id } = await searchParams;
  return (
    <div className="flex flex-col px-5 pb-5 mt-2 w-full h-full justify-center items-center gap-12">
      <PaymentContent id={order_id} />
    </div>
  );
}
