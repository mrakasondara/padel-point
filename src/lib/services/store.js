import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (court) =>
        set((state) => ({
          cart: [...state.cart, court],
        })),

      resetCart: () => set((state) => ({ cart: [] })),
      removeItemFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-court",
    }
  )
);

export default useStore;
