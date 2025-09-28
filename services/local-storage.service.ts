/**
 * Class Service để quản lý các tương tác với LocalStorage.
 *
 * Class này đảm bảo rằng tất cả các thao tác (get, set, remove)
 * chỉ chạy trên môi trường Client (Browser) và xử lý lỗi JSON Parsing.
 */
export class LocalStorageService {
  /**
   * Lấy một giá trị từ LocalStorage theo khóa (key).
   * @param {string} key - Khóa để truy xuất dữ liệu.
   * @returns {T | null} Giá trị đã giải mã (parsed) hoặc null nếu không tìm thấy.
   */
  public getItem<T>(key: string): T | null {
    // Đảm bảo code chỉ chạy trên môi trường trình duyệt
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const serializedValue = localStorage.getItem(key);

      if (serializedValue === null) {
        return null;
      }

      // Giả định dữ liệu được lưu dưới dạng JSON string
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu từ LocalStorage cho khóa "${key}":`, error);
      // Nếu có lỗi, xóa mục này để tránh lặp lại lỗi
      this.removeItem(key);
      return null;
    }
  }

  /**
   * Lưu một giá trị vào LocalStorage theo khóa (key).
   * @param {string} key - Khóa để lưu trữ dữ liệu.
   * @param {T} value - Giá trị cần lưu (có thể là object).
   */
  public setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Chuyển đổi giá trị sang JSON string trước khi lưu
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Lỗi khi lưu dữ liệu vào LocalStorage cho khóa "${key}":`, error);
    }
  }

  /**
   * Xóa một mục khỏi LocalStorage theo khóa (key).
   * @param {string} key - Khóa cần xóa.
   */
  public removeItem(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  }

  /**
   * Xóa tất cả các mục khỏi LocalStorage (cần thận trọng khi sử dụng).
   */
  public clear(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.clear();
  }
}

// Export một instance duy nhất (Singleton) để sử dụng trong toàn bộ ứng dụng.
export const localStorageService = new LocalStorageService();