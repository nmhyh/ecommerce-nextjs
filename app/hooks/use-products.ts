"use client";

import useSWR from "swr";
import { productService } from "@/services";
import { Product } from "@/services/models";

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "/products", // key cho SWR
    () => productService.getProducts() // fetcher function
  );

  return {
    products: data || [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}
