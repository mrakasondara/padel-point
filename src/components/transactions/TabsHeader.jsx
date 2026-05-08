import { TabsList, TabsTrigger } from "../ui/tabs";

export const TabsHeader = () => {
  return (
    <TabsList variant="line">
      <TabsTrigger className="cursor-pointer" value="overview">
        All Transactions
      </TabsTrigger>
      <TabsTrigger className="cursor-pointer" value="paid">
        Paid
      </TabsTrigger>
      <TabsTrigger className="cursor-pointer" value="pending">
        Pending
      </TabsTrigger>
      <TabsTrigger className="cursor-pointer" value="failed">
        Failed
      </TabsTrigger>
    </TabsList>
  );
};
