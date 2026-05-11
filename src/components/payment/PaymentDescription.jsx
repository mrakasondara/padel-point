export const PaymentDescription = ({ transaction_status = "pending" }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 mt-3 px-2">
      {transaction_status === "paid" && (
        <h1 className="text-2xl font-semibold text-green-500">
          Payment Successful!
        </h1>
      )}
      {transaction_status === "pending" && (
        <h1 className="text-2xl font-semibold text-yellow-500">
          Pending Payment!
        </h1>
      )}
      {transaction_status === "expire" && (
        <h1 className="text-2xl font-semibold text-gray-500">
          Expired Payment!
        </h1>
      )}

      <p className="text-sm text-slate-500">
        {transaction_status === "paid" &&
          "Your payment has been processed successfully. Thankyou!"}
        {transaction_status === "pending" && "Please proceed with the payment"}
        {transaction_status === "expire" &&
          "Oops! The payment time has run out. Don’t worry, you can try again by starting a new payment.!"}
      </p>
    </div>
  );
};
