"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import toRupiah from "@develoka/angka-rupiah-js";
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
import { errorStyle, successStyle } from "@/lib/toster-styles";
import useStore from "@/lib/services/store";
import { CartItem } from "./CartItem";
import PadelApi from "@/lib/services/api/padelAPI";
import { Spinner } from "@/components/ui/spinner";

export const Cart = () => {
  const { cart, resetCart } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const mergedCart = cart.reduce((acc, item) => {
    const existCourt = acc.find((court) => court.id == item.id);
    if (existCourt) {
      existCourt.selectedDates.push({
        date: item.selectedDate,
        time: item.selectedTime,
      });
    } else {
      acc.push({
        ...item,
        selectedDates: [{ date: item.selectedDate, time: item.selectedTime }],
      });
    }
    return acc;
  }, []);

  const totalPrice = cart.reduce((acc, prev) => acc + prev.price, 0);

  const onReset = (e) => {
    e.preventDefault();
    resetCart();
    toast.success("Cart been successfully emptied", {
      style: successStyle,
    });
  };

  const onCheckOut = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await PadelApi.addToCart(cart);
      if (response?.success) {
        toast.success(response.message, {
          style: successStyle,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: errorStyle,
      });
    } finally {
      setIsLoading(false);
    }
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
            {mergedCart?.map((court) => {
              return <CartItem court={court} key={court.id} />;
            })}
          </div>
          <DialogFooter className="flex flex-col md:flex-row items-center">
            <p className="mr-auto">
              Total :{" "}
              <span className="font-semibold text-main-theme">
                {toRupiah(totalPrice, { dot: ",", floatingPoint: 0 })}
              </span>
            </p>
            <div className="flex gap-1 justify-end w-full">
              <DialogClose asChild>
                <Button variant="outline" onClick={onReset}>
                  Reset
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="outline"
                onClick={onCheckOut}
                className="bg-main-theme hover:bg-secondary-theme  hover:text-main-theme cursor-pointer transition text-constant font-poppins text-[12px]"
              >
                {isLoading ? <Spinner /> : ""}
                Check Out
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
