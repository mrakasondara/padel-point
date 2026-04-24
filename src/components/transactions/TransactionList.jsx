export const TransactionList = ({ title }) => {
  return (
    <div className="p-3">
      <h1>
        {title == "overview" ? "All Transaction" : `Transaction ${title}`}{" "}
      </h1>
    </div>
  );
};
