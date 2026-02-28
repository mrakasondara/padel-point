import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { successStyle } from "@/lib/toster-styles";

export const Cart = () => {
  const resetCart = (e) => {
    e.preventDefault();
    toast.success("Cart been successfully emptied", {
      style: successStyle,
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-main-theme/90 hover:bg-secondary-theme hover:text-main-theme/90 dark:hover:text-constant cursor-pointer transition text-constant font-poppins text-[12px]"
            size="sm"
          >
            <ShoppingCart />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              Click check out when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 shadow p-2 rounded-md">
              <img
                src="/images/courts/jasper.jpg"
                alt="cart-image"
                className="w-20 rounded-md"
              />
              <div className="flex flex-col w-full">
                <h6 className=" text-[14px] text-main-theme">Jasper Court</h6>
                <p className=" text-[13px]">Location</p>
                <div className="flex text-[12px] justify-between w-full mt-1">
                  <p>23/12/2026</p>
                  <p>Rp.110.000</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shadow p-2 rounded-md">
              <img
                src="/images/courts/jasper.jpg"
                alt="cart-image"
                className="w-20 rounded-md"
              />
              <div className="flex flex-col w-full">
                <h6 className=" text-[14px] text-main-theme">Jasper Court</h6>
                <p className=" text-[13px]">Location</p>
                <div className="flex text-[12px] justify-between w-full mt-1">
                  <p>23/12/2026</p>
                  <p>Rp.110.000</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center">
            <p className="mr-auto">
              Total :{" "}
              <span className="font-semibold text-main-theme">Rp. 220.000</span>
            </p>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetCart}>
                Reset
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-main-theme hover:bg-secondary-theme hover:text-main-theme dark:hover:text-constant cursor-pointer transition text-constant font-poppins text-[12px]"
            >
              Check Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
