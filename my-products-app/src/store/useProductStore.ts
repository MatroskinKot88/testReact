import { create } from "zustand";
import type { Product } from "../types/Product";

// Форма хранилища
type ProductStore = {
    products: Product [];
    setProducts: (products: Product []) => void;
    toggleLike: (id: number) => void;
    removeProduct: (id: number) => void;
    addProduct: (product: Omit<Product, 'id'>) => void;
    getNextId: () => number;
}

export const useProductStore = create<ProductStore> ((set, get) => {
    return {
        products: [],

        setProducts: function(products) {
            set({
                products: products.map((p) => ({...p, liked: false})),
            });
        },

        toggleLike: function (id) {
            set((state) => {
                return {
                    products: state.products.map((p) => p.id === id ? {...p, liked: !p.liked} : p),
                };
            });
        },
        
        removeProduct: function (id) {
            set((state) => {
                return {
                    products: state.products.filter((p) => p.id !== id),    
                };
            });
        },

        addProduct: function (product) {
            const id = get().getNextId();
            set((state) => {
                return {
                    products: [...state.products, {...product, id, liked: false}],
                };
            });
        },

        getNextId: function() {
            const ids = get().products.map((p) => p.id);
            if (ids.length === 0) {
                return 1;
            }
            return Math.max(...ids) + 1;
        },
    };
});