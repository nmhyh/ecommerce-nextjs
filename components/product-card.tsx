"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from "@/services/models"; // Đã giữ nguyên import type của bạn
import { redirect } from "next/navigation";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/app/auth-context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

/**
 * Component tái sử dụng cho Thẻ sản phẩm
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Tính toán giá (Giả định giá cũ = giá hiện tại trong ví dụ này, bạn nên dùng discountPercentage)
  const oldPrice = product.price * (1 / (1 - product.discountPercentage / 100)); // Tính ngược giá gốc nếu có discount
  const currentPrice = product.price;
  const { isAuthenticated, currentUser } = useAuth(); // 🔥 Lấy Auth State

  const handleAddToCart = async () => {
    if (!isAuthenticated || product.stock === 0) return;
    try {
      const data = await cartService.addToCart(currentUser?.id || 1, product);
      toast.success(`${product.title} added to cart!`);
      console.log("Cart updated:", data);
    } catch (err) {
      toast.error("Failed to add to cart!");
      console.error(err);
    }
  };

  return (
    <div key={product.id} className="bg-white p-3 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">

      {/* CONTAINER CHO IMAGE: Phải có relative và height cố định (h-64) */}
      <div className="relative h-64 w-full mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.thumbnail || ''}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hiển thị Discount/Status nếu cần */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              -{product.discountPercentage}%
          </span>
        )}
      </div>

      <Link
        onClick={() => {
          redirect(`/shop/${product.id}`);
        }}
        href={`/shop/${product.id}`}
        className="text-lg h-[56px] font-semibold mb-2 hover:text-primary transition-colors block line-clamp-2"
      >
        {product.title}
      </Link>
      <p className="my-2 text-sm text-gray-500">{product.category}</p>

      <div className="flex items-center mb-4">
        <span className={`text-lg font-bold ${product.discountPercentage > 0 ? 'text-primary' : 'text-gray-900'}`}>
            ${currentPrice.toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <span className="text-sm line-through ml-2 text-gray-400">${oldPrice.toFixed(2)}</span>
        )}
        {/* Thêm Rating (từ Product interface) */}
        <div className="flex items-center ml-auto text-yellow-500">
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.575l6.561-.955L10 1l2.952 5.62 6.561.955-4.758 4.66.123 6.545z"/></svg>
          <span className="text-sm text-gray-600">({product.rating?.toFixed(1) || '0.0'})</span>
        </div>
      </div>

      <button
        className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full transition-colors disabled:opacity-50"
        disabled={product.stock === 0}
        onClick={handleAddToCart}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductCard;
