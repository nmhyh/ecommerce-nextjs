"use client";

import Link from "next/link";
import { productService } from "@/services";
import ProductTabs from "@/app/shop/[id]/(components)/product-tabs";
import { useEffect, useState } from "react";
import { Product } from "@/services/models";
import { useProducts } from "@/hooks";
import ProductCard from "@/components/product-card";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>(); // 👈 khai báo generic để có type
  const id = params.id; // string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { products } = useProducts();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProductItem() {
      try {
        const res = await productService.getProductById(Number(id));
        setProduct(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProductItem();
  }, [id]);

  useEffect(() => {
    setLatestProducts(products.slice(-4));
  }, [products]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  return (
    <section className="p-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:underline capitalize"
            >
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold">{product.title}</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="flex flex-col gap-3">
          {/* Ảnh chính */}
          <div className="relative w-full h-80">
            <Image
              fill
              src={product.thumbnail}
              alt={product.title}
              className="object-cover rounded-lg border"
            />
          </div>

          {/* Danh sách ảnh nhỏ */}
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((img, idx) => (
              <div key={idx} className="relative w-full h-20">
                <Image
                  fill
                  src={img}
                  alt={`${product.title} ${idx}`}
                  className="object-cover rounded-md border"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <span className="text-3xl font-semibold text-primary">
              ${product.price}
            </span>
            <span className="ml-3 text-gray-500">
              Rating: ⭐ {product.rating}
            </span>
          </div>

          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-transparent hover:text-primary border border-primary transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Description Tabs */}
      <ProductTabs product={product} />

      {/* Related Products (placeholder) */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestProducts && latestProducts?.map((productItem) => (
            <div key={productItem.id} className="rounded-lg p-4">
              <ProductCard product={productItem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
