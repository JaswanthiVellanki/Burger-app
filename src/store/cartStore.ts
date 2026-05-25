import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

// I went with Zustand here mainly because of the persist middleware.
// It saves the cart to localStorage automatically so items stay
// in the cart even after a page refresh or hard navigation.
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          // Already in the cart — just bump the quantity
          set({
            items: get().items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          // First time adding this item
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      // Add up all quantities across every item in the cart
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'burger-cart', // localStorage key
    }
  )
);