import { TabsContent } from "../ui/tabs";
import { TransactionsList } from "./TransactionsList";

export const TabsBody = () => {
  return (
    <>
      <TabsContent value="overview">
        <TransactionsList />
      </TabsContent>
      <TabsContent value="paid">
        <TransactionsList status="paid" />
      </TabsContent>
      <TabsContent value="pending">
        <TransactionsList status="pending" />
      </TabsContent>
      <TabsContent value="failed">
        <TransactionsList status="failed" />
      </TabsContent>
    </>
  );
};
