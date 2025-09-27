import { useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";
import { CartItem } from "@/services/models";
import { useAuth } from "@/app/auth-context";

export function useCart(cartId: number) {
  const [cart, setCart] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth(); // 🔥 Lấy Auth state

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const data = await cartService.getCartById(cartId);
        setCart(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Lỗi khi lấy giỏ hàng");
        }
      } finally {
        setLoading(false);
      }
    }

    if (!isAuthenticated) return;
    fetchCart();
  }, [cartId, isAuthenticated]);

  return { cart, setCart, loading, error };
}
