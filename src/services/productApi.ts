import { apiClient } from './apiClient';
import { useQuery } from '@tanstack/react-query';
import { PRICE_MULTIPLIER, STALE_TIME_MS } from '@constants/student';

export interface Product {
    id: string;
    title: string;
    price: number;
    rawPrice: number;
    description: string;
    image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await apiClient.get('/products?limit=12');
    return response.data.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        rawPrice: item.price,
        price: Math.round(item.price * PRICE_MULTIPLIER),
        description: item.description,
        image: item.image,
    }));
};

export const useProductsQuery = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });
};