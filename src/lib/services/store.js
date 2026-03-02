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
    }),
    {
      name: "cart-court",
    }
  )
);

export default useStore;
