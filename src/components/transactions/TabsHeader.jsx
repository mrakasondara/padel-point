import { TabsList, TabsTrigger } from "../ui/tabs";

export const TabsHeader = () => {
  return (
    <TabsList variant="line">
      <TabsTrigger value="overview">All transactions</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
      <TabsTrigger value="pending">Pending</TabsTrigger>
      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
    </TabsList>
  );
};
