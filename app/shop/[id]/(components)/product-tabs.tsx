"use client";

import React, { useState } from "react";
import { Product } from "@/services/models";

interface ProductCardProps {
  product: Product;
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional information" },
  { id: "reviews", label: "Reviews (3)" },
];

const ProductTabs: React.FC<ProductCardProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  console.log(product)

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Tabs */}
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-base font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-800 hover:text-red-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === "description" && (
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {product.title}
              </h3>
              <p className="mb-4 text-gray-700">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <p className="first-letter:uppercase">{product.category}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Brand</h3>
                <p>{product.brand}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Warranty Information</h3>
                <p>{product.warrantyInformation}</p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              {product.reviews.length > 0 && product.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold">
                    {review.reviewerEmail}
                    <span className="ml-2 text-red-500">
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => {
                        return star <= review.rating ? ('★') : ('☆')
                      })}
                    </span>
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductTabs;
