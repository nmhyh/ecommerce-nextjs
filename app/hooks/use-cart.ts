"use client";

import useSWR from "swr";
import { cartService } from "@/services/cart.service";
import { CartItem } from "@/services/models";
import { useAuth } from "@/app/providers/auth-context";

export function useCart(cartId: number) {
  const { isAuthenticated } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<CartItem>(
    isAuthenticated ? `/carts/${cartId}` : null, // 🔥 chỉ fetch nếu đã login
    () => cartService.getCartById(cartId)
  );

  return {
    cart: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    mutate, // để update lại giỏ hàng sau khi add/remove item
  };
}
