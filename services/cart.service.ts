import axios from 'axios';
import { Product } from "@/services/models/products.model";
import httpClient from './axios-client.service';
import { Cart } from "@/services/models";

export class CartService {
  constructor() {}

  /**
   * Lấy giỏ hàng theo userId
   * @param cartId
   */
  async getCartById(cartId: number): Promise<Cart> {
    try {
      // DummyJSON API: /carts/${cartId}
      const response = await httpClient.get<Cart>(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi Axios khi lấy giỏ hàng theo user:", error.message);
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error("Lỗi không xác định khi lấy giỏ hàng.");
    }
  }

  /**
   * Lấy giỏ hàng theo userId
   * @param userId ID của user đang login
   */
  async getCartByUser(userId: number): Promise<Cart[]> {
    if (!userId || userId <= 0) {
      throw new Error("User ID không hợp lệ.");
    }

    try {
      // DummyJSON API: /carts/user/{userId}
      const response = await httpClient.get<{ carts: Cart[] }>(`/carts/user/${userId}`);
      return response.data.carts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi Axios khi lấy giỏ hàng theo user:", error.message);
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error("Lỗi không xác định khi lấy giỏ hàng theo user.");
    }
  }

  // Thêm sản phẩm vào giỏ hàng của user
  async addToCart(userId: number, product: Product): Promise<void> {
    try {
      await httpClient.post(`/carts/user/${userId}`, { productId: product.id, quantity: 1 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi Axios khi thêm sản phẩm:", error.message);
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error("Lỗi không xác định khi thêm sản phẩm vào giỏ hàng.");
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng của user
  async removeFromCart(userId: number, productId: number): Promise<void> {
    try {
      await httpClient.delete(`/carts/user/${userId}/${productId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi Axios khi xóa sản phẩm:", error.message);
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error("Lỗi không xác định khi xóa sản phẩm khỏi giỏ hàng.");
    }
  }

  // Xóa toàn bộ giỏ hàng của user
  async clearCart(userId: number): Promise<void> {
    try {
      await httpClient.delete(`/carts/user/${userId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi Axios khi xóa giỏ hàng:", error.message);
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error("Lỗi không xác định khi xóa giỏ hàng.");
    }
  }
}

// Export singleton instance
export const cartService = new CartService();
