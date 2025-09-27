import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  localStorageService
} from "@/services/local-storage.service";

// Chúng ta sẽ cần một hàm để xử lý việc xóa token
// Lý tưởng là bạn import nó từ AuthService hoặc tạo một hàm utility
const clearAuthStorage = () => {
  localStorage.removeItem('authToken');
};

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Class wrapper để cấu hình và quản lý Axios Instance
 * với các Interceptors.
 */
export class AxiosClient {
  private instance: AxiosInstance;

  constructor(
  ) {
    this.instance = this.createAxiosInstance();
    this.setupInterceptors();
  }

  /**
   * Khởi tạo Axios Instance cơ sở.
   */
  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Cấu hình Request và Response Interceptors.
   */
  private setupInterceptors(): void {
    // --- REQUEST INTERCEPTOR (Thêm Token) ---
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorageService.getItem('authToken');

        // Chỉ thêm token nếu tồn tại và không phải là yêu cầu đăng nhập
        if (token && !config.url?.includes('/auth/login')) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // --- RESPONSE INTERCEPTOR (Xử lý lỗi 401) ---
    this.instance.interceptors.response.use(
      (response) => response, // Yêu cầu thành công
      async (error: AxiosError) => {

        // Xử lý lỗi 401 Unauthorized
        if (error.response?.status === 401) {
          console.error("Token hết hạn hoặc không hợp lệ. Đang chuyển hướng...");

          // Xóa token cũ
          clearAuthStorage();

          // Chuyển hướng cứng đến trang đăng nhập
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Trả về instance Axios đã được cấu hình để sử dụng.
   */
  public getClient(): AxiosInstance {
    return this.instance;
  }
}

// --- TẠO VÀ EXPORT INSTANCE SINGLETON ---

// Tạo instance duy nhất của class client
const httpClient = new AxiosClient();

// Export instance đã cấu hình (dùng để gọi API)
export default httpClient.getClient();