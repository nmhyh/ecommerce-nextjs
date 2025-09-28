"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services";
import { Product } from "@/services/models";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch products");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
