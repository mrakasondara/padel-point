import { Tabs } from "../ui/tabs";
import { TabsBody } from "./TabsBody";
import { TabsHeader } from "./TabsHeader";

export const TransactionsContent = () => {
  return (
    <div className="flex flex-col mt-2 w-full gap-[1rem]">
      <Tabs defaultValue="overview">
        <TabsHeader />
        <TabsBody />
      </Tabs>
    </div>
  );
};
