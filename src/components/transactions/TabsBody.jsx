import { TabsContent } from "../ui/tabs";
import { TransactionList } from "./TransactionList";

export const TabsBody = () => {
  return (
    <>
      <TabsContent value="overview">
        <TransactionList title="overview" />
      </TabsContent>
      <TabsContent value="completed">
        <TransactionList title="Completed" />
      </TabsContent>
      <TabsContent value="pending">
        <TransactionList title="Pending" />
      </TabsContent>
      <TabsContent value="cancelled">
        <TransactionList title="Cancelled" />
      </TabsContent>
    </>
  );
};
