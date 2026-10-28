import { Product } from "@/app/types/product";

import { create } from "zustand";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    items: CartItem[];

    addItem: (product: Product, quantity?: number) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;

    getItemCount: () => number;
    getSubTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (product, quantity = 1) => {
        if (quantity <= 0) return;

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
                                quantity: existingItem.quantity + quantity,
                            }
                        : item
                    ),
                };
            }
            
            return {
                items: [...state.items, { product, quantity}],
            };
        });
    },

    increaseQuantity: (productId) => {
        set((state) => ({
            items: state.items.map((item) => 
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        }));
    },

     decreaseQuantity: (productId) => {
        set((state) => ({
            items: state.items.map((item) => 
                item.product.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
                .filter((item) => item.quantity > 0),
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
        get().items.reduce((total, item) => total + item.quantity, 0),
    
    getSubTotal: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
}));
