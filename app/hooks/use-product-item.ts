"use client";

import useSWR from "swr";
import { productService } from "@/services";
import { Product } from "@/services/models";

interface UseProductItem {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProductItem(id?: number): UseProductItem {
  const { data, error, isLoading } = useSWR<Product>(
    id ? `/products/${id}` : null, // chỉ fetch khi có id
    () => productService.getProductById(Number(id))
  );

  return {
    product: data || null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}
