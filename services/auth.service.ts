import { LoginPayload, User, UserProfile } from "@/services/models";
import httpClient from './axios-client.service';
import { localStorageService } from "@/services/local-storage.service";

export class AuthService {

  constructor() {}

  /**
   * Mô phỏng đăng nhập.
   * @param {LoginPayload} credentials - Tên người dùng và mật khẩu.
   * @returns {Promise<User>} Thông tin người dùng và token.
   */
  async login({ username, password }: LoginPayload): Promise<User> {
    try {
      // Sử dụng httpClient.post()
      const response = await httpClient.post<User>('/auth/login', {
        username: username,
        password: password,
      });

      // ... (Logic lưu token giữ nguyên)
      const user = response.data;
      if (user.accessToken) {
        localStorageService.setItem('authToken', user.accessToken);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy thông tin người dùng từ token (Mô phỏng endpoint /me).
   * @returns {Promise<UserProfile>} Thông tin người dùng.
   */
  async getCurrentUser(): Promise<UserProfile> {
    try {
      // Sử dụng httpClient.get()
      const response = await httpClient.get<UserProfile>('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa token và đăng xuất người dùng.
   */
  logout(): void {
    localStorageService.removeItem('authToken');
  }
}

export const authService = new AuthService();