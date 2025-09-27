
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;

  // JWT được sử dụng để xác thực các yêu cầu API sau này
  accessToken: string;

  // Token dùng để làm mới accessToken (trong môi trường thực tế)
  refreshToken: string;

  // Các trường khác có thể có trong thực tế (nhưng không có trong ví dụ này):
  // role: 'admin' | 'user';
}

// Nếu bạn cần định nghĩa riêng cho thông tin người dùng không kèm token:
export type UserProfile = Omit<User, 'accessToken' | 'refreshToken'>;

export interface LoginPayload {
  username?: string;
  password?: string;
}
