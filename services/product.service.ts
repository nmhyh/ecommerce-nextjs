import axios from 'axios';
import { Product, ProductListResponse } from "@/services/models/products.model";
import httpClient from './axios-client.service';

// (Giao diện Product và ProductListResponse được đặt ở trên)

/**
 * Lớp dịch vụ quản lý các tương tác với API Sản phẩm của DummyJSON.
 */
export class ProductService {
  /**
   * Khởi tạo ProductService, thiết lập client Axios với base URL.
   */
  constructor() {}

  /**
   * Lấy danh sách tất cả sản phẩm từ DummyJSON.
   * @returns {Promise<Product[]>} Một mảng các đối tượng sản phẩm.
   */
  async getProducts(): Promise<Product[]> {
    try {
      // Chỉ định rõ kiểu dữ liệu trả về từ Axios
      const response = await httpClient.get<ProductListResponse>('/products');

      // Trả về mảng products từ dữ liệu response
      return response.data.products;
    } catch (error) {
      // Sử dụng Type Guard để xử lý lỗi Axios
      if (axios.isAxiosError(error)) {
        console.error('Lỗi Axios khi lấy sản phẩm:', error.message);
        // Ném lỗi với thông báo lỗi cụ thể hơn
        throw new Error(`Lỗi kết nối API: ${error.message}`);
      }
      throw new Error('Lỗi không xác định khi lấy danh sách sản phẩm.');
    }
  }

  /**
   * Lấy một sản phẩm cụ thể theo ID.
   * @param {number} id - ID của sản phẩm.
   * @returns {Promise<Product>} Đối tượng sản phẩm.
   */
  async getProductById(id: number): Promise<Product> {
    if (!id || id <= 0) {
      throw new Error("ID sản phẩm phải là một số dương hợp lệ.");
    }

    try {
      // Chỉ định rõ kiểu dữ liệu trả về từ Axios
      const url = `/products/${id}`;
      const response = await httpClient.get<Product>(url);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          throw new Error(`Sản phẩm với ID ${id} không tồn tại.`);
        }
        throw new Error(`Lỗi truy xuất sản phẩm: ${error.message}`);
      }
      throw new Error('Đã xảy ra lỗi không xác định.');
    }
  }
}

// Export một instance duy nhất (Singleton) để dễ dàng sử dụng trong ứng dụng
export const productService = new ProductService();