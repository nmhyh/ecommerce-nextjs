import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Thêm các hostname từ DummyJSON
    // Có vẻ DummyJSON sử dụng hai subdomain chính cho hình ảnh
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        // Tên miền cho các ảnh CDN (như trong lỗi đầu tiên)
        hostname: 'cdn.dummyjson.com',
      },
    ],
    // Hoặc nếu bạn đang dùng Next.js cũ hơn (< 13.4), dùng domains:
    // domains: ['dummyjson.com', 'cdn.dummyjson.com'],
  },
};

export default nextConfig;
