import { useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";
import { ProductInCart } from "@/services/models";

export function useCart(cartId: number) {
  const [cart, setCart] = useState<ProductInCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const data = await cartService.getCartById(cartId);
        setCart(data);
      } catch (err: any) {
        setError(err.message || "Lỗi khi lấy giỏ hàng");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [cartId]);

  return { cart, setCart, loading, error };
}
