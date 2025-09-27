"use client";

import React from 'react';
import { Product } from "@/services/models";
import ProductCard from "@/components/product-card";

interface ProductSectionProps {
  title: string;
  products: Product[];
  bgColor?: string; // Ví dụ: bg-gray-50
}

const ProductSection : React.FC<ProductSectionProps> = ({ title, products, bgColor = 'bg-white' }) => {
  return (
    <section id={title.toLowerCase().replace(/\s/g, '-') + '-section'} className={`py-10 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">{title}</h2>
        <div className="flex flex-wrap -mx-4">
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <ProductCard product={product}/>
              </div>
            ))}
        </div>
      </div>
    </section>
);
};

export default ProductSection;
