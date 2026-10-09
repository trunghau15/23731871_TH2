import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    changeQty: (id: string, delta: number) => void;
    clearCart: () => void;
    totalQuantity: () => number;
    totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const current = get().items;
                const found = current.find((i) => i.id === product.id);
                if (found) {
                    set({
                        items: current.map((i) =>
                            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...current, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            changeQty: (id, delta) => {
                const current = get().items;
                set({
                    items: current
                        .map((i) => {
                            if (i.id === id) {
                                const newQty = i.quantity + delta;
                                return newQty > 0 ? { ...i, quantity: newQty } : null;
                            }
                            return i;
                        })
                        .filter(Boolean) as CartItem[],
                });
            },
            clearCart: () => set({ items: [] }),
            totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            totalAmount: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);