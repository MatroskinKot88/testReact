import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

export const useFetchProducts = () => {
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();
                useProductStore.getState().setProducts(data); 
            }catch (err) {
                console.error('Failed to fetch products', err);
            }
        };
        load();
    }, []);
};