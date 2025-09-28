"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CategoryBanner {
  image: string;
  title: string;
  href: string;
}

interface CategoryBannersProps {
  banners: CategoryBanner[];
}

const CategoryBanners: React.FC<CategoryBannersProps> = ({ banners }) => {
  return (
    <section id="product-banners">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-wrap -mx-4">
          {banners.map((banner, index) => (
            <div key={index} className="w-full sm:w-1/3 px-4 mb-8">
              <div className="category-banner relative overflow-hidden rounded-xl shadow-xl group">
                <div className="relative h-64 w-full">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{banner.title}</h2>
                  <Link href={banner.href}
                        className="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white font-semibold px-6 py-2 rounded-full inline-block transition duration-300">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanners;
