import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      cartOpen: false,

      setCartOpen: (value) => set({ cartOpen: value }),

      addItem: (product, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.id === product.id);
          if (idx > -1) {
            const items = state.items.slice();
            items[idx] = { ...items[idx], qty: (items[idx].qty || 0) + qty };
            return { items };
          }
          return { items: [...state.items, { ...product, qty }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + (i.qty || 0), 0),
      totalPrice: () =>
        get().items.reduce((s, i) => s + (i.qty || 0) * (i.price || 0), 0),
    }),
    {
      name: "my-shop-cart",
    }
  )
);
