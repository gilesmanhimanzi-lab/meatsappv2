import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Product } from "@/app/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[];

  addItem: (product: Product, price: number) => void;
  increaseQuantity: (productId: string, amount: number) => void;
  decreaseQuantity: (productId: string, amount: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;

  getItemCount: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist((set, get) => ({
      items: [],

      addItem: (product, amount) => {
        if (!Number.isFinite(amount) || amount <= 0) {
          return;
        }

        const quantity = amount / product.price;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      price: item.price + 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items, 
              { 
                product,  
                quantity,
                price: amount 
              }
            ],
          };
        });
      },

      increaseQuantity: (productId, amount) => {
        if (!Number.isFinite(amount) || amount <= 0) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  price: item.price + amount,
                  quantity: item.quantity + amount / item.product.price,
                }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId, amount) => {
        if (!Number.isFinite(amount) || amount <= 0) return;
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.product.id !== productId) return item;

              const newAmount = Math.max(0, item.price - amount);

              return {
                ...item,
                price: newAmount,
                quantity: newAmount / item.product.price,
              };    
            })
            .filter((item) => item.price > 0),
        }));
    },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.price,
          0
        ),
    }),

    {
      name: "meatsapp-shopping-cart",
      storage: createJSONStorage(() => AsyncStorage),

      // Persist only the cart items, not the store's functions.
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
